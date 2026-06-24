import { NextResponse } from "next/server";
import { getContent, saveContent, ContentMap } from "@/lib/storage";

export async function GET(request: Request) {
  const adminPwd = process.env.ADMIN_PASSWORD || "lloveras2024";
  const auth = request.headers.get("x-admin-password");
  if (auth !== adminPwd) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const content = await getContent();
  return NextResponse.json(content);
}

export async function POST(request: Request) {
  const adminPwd = process.env.ADMIN_PASSWORD || "lloveras2024";
  const auth = request.headers.get("x-admin-password");
  if (auth !== adminPwd) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const incoming: ContentMap = await request.json();
  // Merge con el contenido existente para no perder otras secciones
  const existing = await getContent();
  const merged: ContentMap = { ...existing };
  for (const [id, data] of Object.entries(incoming)) {
    merged[id as keyof ContentMap] = { ...(existing[id as keyof ContentMap] || {}), ...data };
  }
  await saveContent(merged);
  return NextResponse.json({ ok: true });
}
