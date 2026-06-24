import { SectionId } from "./content";

export type SectionContent = {
  videoUrl?: string;
  pdfUrl?: string;
  updatedAt?: string;
};

export type ContentMap = Partial<Record<SectionId, SectionContent>>;

// Guardamos el content map en un archivo JSON en /tmp (persiste entre requests en el mismo worker)
// y usamos Vercel Blob como storage persistente
const CONTENT_KEY = "lloveras-content.json";

let memoryCache: ContentMap | null = null;

export async function getContent(): Promise<ContentMap> {
  if (memoryCache) return memoryCache;
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list({
        prefix: CONTENT_KEY,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      if (blobs.length > 0) {
        // Para blob privado usamos fetch con el token
        const blobUrl = blobs[0].url;
        const res = await fetch(blobUrl, {
          headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
          next: { revalidate: 60 },
        });
        if (res.ok) {
          memoryCache = await res.json();
          return memoryCache!;
        }
      }
    }
  } catch (e) {
    console.error("getContent error:", e);
  }
  return {};
}

export async function saveContent(map: ContentMap): Promise<void> {
  memoryCache = map;
  const { put } = await import("@vercel/blob");
  await put(CONTENT_KEY, JSON.stringify(map), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}
