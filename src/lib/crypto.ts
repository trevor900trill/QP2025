// IMPORTANT: This file should only be used in server-side code.
import CryptoJS from 'crypto-js';

const getEncryptionKey = (): string => {
  const key = process.env.AES_ENCRYPTION_KEY;
  if (!key) {
    console.error('AES_ENCRYPTION_KEY is not set in environment variables.');
    throw new Error('Server configuration error.');
  }
  return key;
};

/**
 * Decrypts a base64 encoded and AES encrypted string.
 * @param encryptedBase64 The encrypted string in base64 format.
 * @returns The decrypted string.
 */
export function decryptToken(encryptedBase64: string): string {
  const key = getEncryptionKey();
  try {
    const encryptedData = CryptoJS.enc.Base64.parse(encryptedBase64);
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: encryptedData } as any, // Type assertion to match expected format
      CryptoJS.enc.Utf8.parse(key),
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    if (!decryptedText) {
      throw new Error('Decryption resulted in an empty string. Check key or encrypted data.');
    }
    return decryptedText;
  } catch (error) {
    console.error('Decryption failed:', error);
    // In a real app, you might want to handle this more gracefully
    // For now, we'll throw an error to make it clear something went wrong.
    throw new Error('Failed to decrypt token.');
  }
}

/**
 * Encrypts a string with AES and returns it as a base64 encoded string.
 * @param text The string to encrypt.
 * @returns The base64 encoded encrypted string.
 */
export function encryptToken(text: string): string {
  const key = getEncryptionKey();
  try {
    const encrypted = CryptoJS.AES.encrypt(
      text,
      CryptoJS.enc.Utf8.parse(key),
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    return encrypted.toString(); // This is already base64 encoded by default
  } catch (error) {
    console.error('Encryption failed:', error);
    throw new Error('Failed to encrypt token.');
  }
}
