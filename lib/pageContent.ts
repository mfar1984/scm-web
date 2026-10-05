/**
 * Server-side helper to fetch published web-page content from the backend CMS.
 * Falls back to null when the backend is offline so pages can use their own defaults.
 *
 * The website reads content from: {BACKEND}/api/public/content/{slug}
 */

function serverBackendUrl(): string {
  // On the server we cannot read window.__RUNTIME_CONFIG__, so use the env var
  // (or the dev default). The browser runtime-config is only for client fetches.
  return process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3001';
}

export async function fetchPageContent<T = Record<string, unknown>>(
  slug: string
): Promise<T | null> {
  const base = serverBackendUrl();
  try {
    const res = await fetch(`${base}/api/public/content/${slug}`, {
      // Revalidate periodically so CMS edits appear without a redeploy.
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.success ? (json.data as T) : null;
  } catch {
    // Backend offline — caller should fall back to built-in defaults.
    return null;
  }
}
