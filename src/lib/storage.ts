import { SectionId } from "./content";

export type SectionContent = {
  videoUrl?: string;
  pdfUrl?: string;
  updatedAt?: string;
};

export type ContentMap = Partial<Record<SectionId, SectionContent>>;

const CONTENT_KEY = "lloveras-content.json";

export async function getContent(): Promise<ContentMap> {
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list({ prefix: CONTENT_KEY });
      if (blobs.length > 0) {
        const res = await fetch(blobs[0].url, { next: { revalidate: 60 } });
        if (res.ok) return res.json();
      }
    }
  } catch {}
  return {};
}

export async function saveContent(map: ContentMap): Promise<void> {
  const { put } = await import("@vercel/blob");
  await put(CONTENT_KEY, JSON.stringify(map), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
