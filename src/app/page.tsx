import { AppShell } from "@/components/AppShell";
import { sections } from "@/lib/content";
import { getContent } from "@/lib/storage";
import { getSignedUrl } from "@/lib/signedUrls";

export const revalidate = 60;

export default async function Page() {
  const content = await getContent();

  const enriched = await Promise.all(
    sections.map(async s => {
      const c = content[s.id] || {};
      // Blob tiene prioridad, content.ts es fallback
      const videoUrl = c.videoUrl || s.videoUrl;
      const pdfUrl = c.pdfUrl || s.pdfUrl;
      return {
        ...s,
        videoUrl: videoUrl ? await getSignedUrl(videoUrl) : undefined,
        pdfUrl: pdfUrl ? await getSignedUrl(pdfUrl) : undefined,
      };
    })
  );

  return <AppShell sections={enriched} />;
}
