import { NextResponse } from "next/server";
import { getContent, saveContent, ContentMap } from "@/lib/storage";
import { revalidatePath } from "next/cache";

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
  const existing = await getContent();
  const merged: ContentMap = { ...existing };
  for (const [id, data] of Object.entries(incoming)) {
    merged[id as keyof ContentMap] = { ...(existing[id as keyof ContentMap] || {}), ...data };
  }
  await saveContent(merged);
  // Revalidar la página principal para que tome el nuevo contenido inmediatamente
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
