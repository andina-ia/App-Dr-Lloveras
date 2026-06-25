import { SectionId } from "./content";

export type SectionContent = {
  videoUrl?: string;
  pdfUrl?: string;
  updatedAt?: string;
};

export type ContentMap = Partial<Record<SectionId, SectionContent>>;

const CONTENT_FILENAME = "lloveras-content.json";

export async function getContent(): Promise<ContentMap> {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) return {};
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: CONTENT_FILENAME, token, mode: "folded" });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (res.ok) return await res.json();
    }
  } catch (e) {
    console.error("getContent:", e);
  }
  return {};
}

export async function saveContent(map: ContentMap): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN no configurado");
  const { put } = await import("@vercel/blob");
  await put(CONTENT_FILENAME, JSON.stringify(map), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    token,
  });
}
