
import { CONFIG } from './config';
import { compactDecrypt } from 'jose';
import { jwtDecode } from 'jwt-decode';

export const API_URL = CONFIG.API_URL;

// --- Types ---

export interface User {
    token: string;
    refreshToken: string;
    tenantid?: string;
    email: string;
    forcePasswordChange?: boolean;
    appUserType?: number; // 1: QP Admin/User(?), 2: Employee, 3: QP Admin(?)
    [key: string]: any;
}

export interface LoginResponse {
    success: boolean;
    status: number;
    data?: any;
    error?: string;
}

export interface ActionsAllowed {
    Read?: boolean;
    Write?: boolean;
    Update?: boolean;
    Delete?: boolean;
}

export interface Permissions {
    Permission?: string;
    ActionsAllowed?: ActionsAllowed;
}

interface DecodedToken {
    permissions?: string;
}

interface DecodedTokenTwo {
    HrAppEnabled?: boolean;
}

// --- Headers Helpers ---

const getAuthHeaders = (): HeadersInit => {
    const userStr = localStorage.getItem('user');
    const headers: any = {
        'Accept': 'application/json',
        'tenant': 'qwikpace',
    };

    if (userStr) {
        const user = JSON.parse(userStr);
        if (user.token) {
            headers['Authorization'] = `Bearer ${user.token}`;
        }
        if (user.tenantid) {
            headers['tenant'] = user.tenantid;
        }
    }
    return headers;
};

const getLoginHeaders = (): HeadersInit => {
    return {
        'Content-Type': 'application/json',
        'tenant': 'qwikpace',
    };
};

// --- API Helpers ---

async function safeReadErrorBody(response: Response): Promise<string> {
    try {
        const text = await response.text();
        try {
            const json = JSON.parse(text);
            return json.message || JSON.stringify(json);
        } catch {
            return text;
        }
    } catch {
        return '';
    }
}

export const logOutAction = () => {
    const currentPath = window.location.pathname;
    localStorage.removeItem('user');
    localStorage.setItem('QpReturn', currentPath);
    window.location.href = '/'; // Redirect to login
};

async function refreshAccessToken(): Promise<boolean> {
    const userStr = localStorage.getItem('user');
    if (!userStr) return false;

    const user = JSON.parse(userStr);
    if (!user?.refreshToken || !user?.token) return false;

    try {
        const res = await fetch(`${API_URL}/authenticate/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'tenant': user.tenantid || 'qwikpace',
            },
            body: JSON.stringify({
                accessToken: user.token,
                refreshToken: user.refreshToken,
            })
        });

        if (res.ok) {
            const data = await res.json();
            user.token = data.accessToken;
            user.refreshToken = data.refreshToken || user.refreshToken;
            localStorage.setItem('user', JSON.stringify(user));
            return true;
        }
    } catch (e) {
        console.error("Refresh token failed", e);
    }

    return false;
}

export async function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
    // Add auth headers by default if not present
    if (!options.headers) {
        options.headers = getAuthHeaders();
    }

    let response = await fetch(url, options);

    if (response.status === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
            // Retry with new token
            options.headers = getAuthHeaders();
            response = await fetch(url, options);
        } else {
            logOutAction();
            const errBody = await safeReadErrorBody(response);
            throw new Error(errBody || 'Unauthorized and refresh failed');
        }
    }

    if (!response.ok) {
        // Allow 400s to be handled by caller sometimes, but here we throw for general failures similar to Vue logic
        // However, Vue's 'login' action manually checks response.ok. 
        // We will keep this generic fetch throwing, but for login we might bypass apiFetch or handle catch.
        const errBody = await safeReadErrorBody(response);
        throw new Error(`Status ${response.status}: ${errBody}` || `HTTP error ${response.status}`);
    }

    return response;
}

// --- Auth Actions ---

export const AuthService = {
    async login(body: any): Promise<LoginResponse> {
        const params: RequestInit = {
            headers: getLoginHeaders(),
            method: "POST",
            body: JSON.stringify(body),
        };

        // Using native fetch here to avoid the automatic throw in apiFetch for 401/etc during login
        try {
            const response = await fetch(`${API_URL}/authenticate/login`, params);

            if (response.ok) {
                const data = await response.json();
                return { success: true, status: response.status, data: data };
            } else {
                const errorMsg = await safeReadErrorBody(response);
                return { success: false, status: response.status, error: errorMsg };
            }
        } catch (e: any) {
            console.error("Login Network Error", e);
            return { success: false, status: 500, error: e.message || "Network Error" };
        }
    },

    async forgotPassword(email: string): Promise<number> {
        const params: RequestInit = {
            headers: getLoginHeaders(),
            method: "POST",
        };
        const response = await fetch(`${API_URL}/authenticate/ForgotPassword?userEmail=${email}`, params);
        return response.status;
    },

    decodeAndCheckPermission: async (): Promise<Permissions[]> => {
        try {
            const storedUser = localStorage.getItem("user");
            if (!storedUser) throw new Error("User not found");

            const t = JSON.parse(storedUser);
            const encryptedToken = t.token;
            if (!encryptedToken) throw new Error("Token missing");

            const encryptionKey = Uint8Array.from(
                atob(CONFIG.ENCRYPTION_KEY),
                (c) => c.charCodeAt(0)
            );

            const { plaintext } = await compactDecrypt(encryptedToken, encryptionKey);
            const innerJwt = new TextDecoder().decode(plaintext);

            const parts = innerJwt.split(".");
            const payloadB64 = parts[1];
            if (!payloadB64) throw new Error("Invalid JWT format");

            const payloadJson = atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/"));
            const decodedToken: DecodedToken = JSON.parse(payloadJson);

            if (
                !decodedToken ||
                decodedToken.permissions === undefined ||
                decodedToken.permissions === null
            ) {
                return [];
            }

            const permission = decodedToken.permissions;

            if (Array.isArray(permission)) {
                return permission.map((jsonString) => {
                    try {
                        return JSON.parse(jsonString) as Permissions;
                    } catch {
                        return {} as Permissions;
                    }
                });
            } else {
                return [JSON.parse(permission) as Permissions];
            }
        } catch (error) {
            console.error("Token decode failed:", error);
            // Do not force logout here immediately, just return empty permissions
            return [];
        }
    },

    checkHrEnabled: (): boolean => {
        const userStr = localStorage.getItem("user");
        if (!userStr) return false;

        const t = JSON.parse(userStr);
        try {
            const decodedToken: DecodedTokenTwo = jwtDecode(t.token) as DecodedTokenTwo;
            return !!decodedToken.HrAppEnabled;
        } catch (error) {
            console.error("Error decoding token for HR check:", error);
            return false;
        }
    }
};
