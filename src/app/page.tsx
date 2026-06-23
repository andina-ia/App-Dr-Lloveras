import { AppShell } from "@/components/AppShell";
import { sections } from "@/lib/content";
import { getContent } from "@/lib/storage";

export const revalidate = 60;

export default async function Page() {
  const content = await getContent();
  const enriched = sections.map(s => ({
    ...s,
    videoUrl: content[s.id]?.videoUrl,
    pdfUrl: content[s.id]?.pdfUrl,
  }));
  return <AppShell sections={enriched} />;
}
