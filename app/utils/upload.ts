import { supabaseBrowser } from "../lib/supabase/browser";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function withRetry<T>(fn: () => Promise<T>, retries = 2) {
  let lastErr: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      await sleep(300 * (i + 1));
    }
  }
  throw lastErr;
}

export async function uploadWithToken(
  bucket: string,
  path: string,
  token: string,
  file: File,
) {
  const { error } = await supabaseBrowser.storage
    .from(bucket)
    .uploadToSignedUrl(path, token, file, { contentType: file.type });

  if (error) throw error;
}