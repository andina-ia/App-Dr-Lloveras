import { AppShell } from "@/components/AppShell";
import { sections } from "@/lib/content";
import { getContent } from "@/lib/storage";
import { getSignedUrl } from "@/lib/signedUrls";

export const revalidate = 7200; // 2 horas — igual que la duración de las URLs firmadas

export default async function Page() {
  const content = await getContent();

  // Enriquecer secciones con URLs firmadas (directas al CDN, sin proxy)
  const enriched = await Promise.all(
    sections.map(async s => {
      const c = content[s.id] || {};
      return {
        ...s,
        videoUrl: c.videoUrl ? await getSignedUrl(c.videoUrl) : undefined,
        pdfUrl: c.pdfUrl ? await getSignedUrl(c.pdfUrl) : undefined,
      };
    })
  );

  return <AppShell sections={enriched} />;
}
