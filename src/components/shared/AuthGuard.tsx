"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const PUBLIC_PATHS = ["/", "/forgot-password", "/reset-password"]; // Add other public paths if needed

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // Check local storage for user/token
        const userStr = localStorage.getItem("user");
        let hasToken = false;
        let userType: number | null = null;

        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                if (user && user.token) {
                    hasToken = true;
                    userType = user.appUserType;
                }
            } catch (e) {
                console.error("AuthGuard: Failed to parse user", e);
            }
        }

        const isPublicPath = PUBLIC_PATHS.includes(pathname);

        if (hasToken) {
            if (isPublicPath) {
                // If logged in and trying to access login/public pages, redirect to module select
                router.push("/module-select");
            } else {
                // Role-based protection
                if (pathname.startsWith("/admin")) {
                    // Admin routes: Require type 1 or 3
                    if (userType === 1 || userType === 3) {
                        setAuthorized(true);
                    } else {
                        // Unauthorized for admin -> redirect to module select
                        router.push("/module-select");
                    }
                } else if (pathname.startsWith("/employee")) {
                    // Employee routes: Require type 2 or 3
                    if (userType === 2 || userType === 3) {
                        setAuthorized(true);
                    } else {
                        // Unauthorized for employee -> redirect to module select
                        router.push("/module-select");
                    }
                } else {
                    // Other authenticated routes (e.g. /module-select itself) -> Allow
                    setAuthorized(true);
                }
            }
        } else {
            if (isPublicPath) {
                // Not logged in and accessing public page -> Allow
                setAuthorized(true);
            } else {
                // Not logged in and accessing protected page -> Redirect to login
                // Store return url
                localStorage.setItem("QpReturn", pathname);
                router.push("/");
            }
        }
    }, [pathname, router]);

    // Prevent flash of unauthorized content
    if (!authorized) {
        return null;
    }

    return <>{children}</>;
}
