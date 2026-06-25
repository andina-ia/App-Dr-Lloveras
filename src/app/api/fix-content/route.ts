import { NextResponse } from "next/server";
import { saveContent } from "@/lib/storage";

export async function GET() {
  const base = "https://4paycditbkbuyusv.private.blob.vercel-storage.com";

  const correctContent = {
    pasos: {
      pdfUrl: `${base}/lloveras/pasos-pdf-1782330217656-Pasos%20a%20seguir.pdf`,
      videoUrl: `${base}/lloveras/pasos-video-1782386574290-Avatar_1.mp4`,
      updatedAt: "2026-06-25T11:09:45.688Z",
    },
    pre: {
      pdfUrl: `${base}/lloveras/pre-pdf-1782330235159-Indicaciones%20pre%20quir%C3%BArgicas.pdf`,
      videoUrl: `${base}/lloveras/pre-video-1782385744614-Avatar_3.mp4`,
      updatedAt: "2026-06-25T11:09:45.688Z",
    },
    post: {
      pdfUrl: `${base}/lloveras/post-pdf-1782330281071-Indicaciones%20post%20quir%C3%BArgicas.pdf`,
      videoUrl: `${base}/lloveras/post-video-1782385862673-Avatar_4.mp4`,
      updatedAt: "2026-06-25T11:11:46.215Z",
    },
  };

  await saveContent(correctContent);
  return NextResponse.json({ ok: true, saved: correctContent });
}
