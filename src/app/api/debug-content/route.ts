import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/storage";

export async function GET() {
  const content = await getContent();
  const result: Record<string, { videoFilename?: string; pdfPresent: boolean }> = {};
  for (const [id, data] of Object.entries(content)) {
    result[id] = {
      videoFilename: data.videoUrl?.split("/").pop()?.split("?")[0],
      pdfPresent: !!data.pdfUrl,
    };
  }
  return NextResponse.json({ rawContent: content, summary: result });
}

export async function POST(request: Request) {
  const adminPwd = process.env.ADMIN_PASSWORD || "lloveras2024";
  const auth = request.headers.get("x-admin-password");
  if (auth !== adminPwd) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const body = await request.json();
  await saveContent(body);
  return NextResponse.json({ ok: true, saved: body });
}

// Fix: swap videos to correct sections
export async function PUT(request: Request) {
  const adminPwd = process.env.ADMIN_PASSWORD || "lloveras2024";
  const auth = request.headers.get("x-admin-password");
  if (auth !== adminPwd) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const content = await getContent();
  const base = "https://4paycditbkbuyusv.private.blob.vercel-storage.com";

  // Current state (wrong):
  // pasos → Avatar_3, pre → Avatar_4, post → Avatar_1
  // Correct:
  // pasos → Avatar_1, pre → Avatar_3, post → Avatar_4

  const fixed = {
    ...content,
    pasos: {
      ...content.pasos,
      videoUrl: `${base}/lloveras/post-video-1782391479049-Avatar_1.mp4`,
      updatedAt: new Date().toISOString(),
    },
    pre: {
      ...content.pre,
      videoUrl: `${base}/lloveras/pasos-video-1782391893432-Avatar_3.mp4`,
      updatedAt: new Date().toISOString(),
    },
    post: {
      ...content.post,
      videoUrl: `${base}/lloveras/pre-video-1782391558073-Avatar_4.mp4`,
      updatedAt: new Date().toISOString(),
    },
  };

  await saveContent(fixed);
  return NextResponse.json({ ok: true, fixed });
}
