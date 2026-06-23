import { NextResponse } from "next/server";
import { getContent, saveContent, ContentMap } from "@/lib/storage";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function POST(request: Request) {
  const adminPwd = process.env.ADMIN_PASSWORD || "lloveras2024";
  const auth = request.headers.get("x-admin-password");
  if (auth !== adminPwd) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body: ContentMap = await request.json();
  await saveContent(body);
  return NextResponse.json({ ok: true });
}
