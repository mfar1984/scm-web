/**
 * Runtime Configuration Helper
 *
 * Gets API URL from runtime config (browser) or environment variable (server).
 * This allows changing the API URL without rebuilding the application.
 */

declare global {
  interface Window {
    __RUNTIME_CONFIG__?: {
      BACKEND_API_URL: string;
      WEBSITE_URL: string;
    };
  }
}

/**
 * Get Backend API URL
 * - Browser: Read from window.__RUNTIME_CONFIG__ (set in /public/runtime-config.js)
 * - Server: Read from process.env.NEXT_PUBLIC_BACKEND_API_URL
 * - Fallback: localhost:3001 (development only)
 */
export function getBackendApiUrl(): string {
  if (typeof window !== 'undefined') {
    const runtimeUrl = window.__RUNTIME_CONFIG__?.BACKEND_API_URL;
    if (runtimeUrl) return runtimeUrl;
  }
  return process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3001';
}

/**
 * Get Website URL
 */
export function getWebsiteUrl(): string {
  if (typeof window !== 'undefined') {
    const runtimeUrl = window.__RUNTIME_CONFIG__?.WEBSITE_URL;
    if (runtimeUrl) return runtimeUrl;
  }
  return process.env.NEXT_PUBLIC_WEBSITE_URL || 'http://localhost:3000';
}
