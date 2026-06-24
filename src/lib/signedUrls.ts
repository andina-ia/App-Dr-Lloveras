import { issueSignedToken, presignUrl } from "@vercel/blob";

// Genera una URL firmada válida por 2 horas para un blob privado
export async function getSignedUrl(blobUrl: string): Promise<string> {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) return blobUrl;

    const pathname = new URL(blobUrl).pathname.slice(1);
    const signedToken = await issueSignedToken({
      token,
      validUntil: Date.now() + 2 * 60 * 60 * 1000, // 2 horas
      operations: ["get"],
    });
    const result = await presignUrl(signedToken, {
      operation: "get",
      pathname,
      access: "private",
    });
    return result.presignedUrl;
  } catch {
    return blobUrl;
  }
}
