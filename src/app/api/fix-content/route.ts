import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/storage";

export async function GET(request: Request) {
  const adminPwd = process.env.ADMIN_PASSWORD || "lloveras2024";
  const auth = new URL(request.url).searchParams.get("pwd");
  if (auth !== adminPwd) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const content = await getContent();
  const fixed = {
    ...content,
    preq: {
      ...content.preq,
      videoUrl: "https://4paycditbkbuyusv.private.blob.vercel-storage.com/pre_cirugia_compressed.mp4",
      updatedAt: new Date().toISOString(),
    },
  };
  await saveContent(fixed);
  return NextResponse.json({ ok: true, fixed });
}
