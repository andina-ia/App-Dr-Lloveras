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

  // Leer el estado actual FRESCO desde Blob (sin cache)
  const existing = await getContent();

  // Log para debug
  console.log("EXISTING:", JSON.stringify(existing));
  console.log("INCOMING:", JSON.stringify(incoming));

  // Merge: solo actualizar las secciones que vienen en el request
  const merged: ContentMap = { ...existing };
  for (const [id, data] of Object.entries(incoming)) {
    const existingSection = existing[id as keyof ContentMap] || {};
    merged[id as keyof ContentMap] = { ...existingSection, ...data };
  }

  console.log("MERGED:", JSON.stringify(merged));

  await saveContent(merged);
  revalidatePath("/");
  return NextResponse.json({ ok: true, merged });
}
