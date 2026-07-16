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
