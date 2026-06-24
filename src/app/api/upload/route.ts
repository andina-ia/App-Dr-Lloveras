import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const adminPwd = process.env.ADMIN_PASSWORD || "lloveras2024";
  const auth = request.headers.get("x-admin-password");
  if (auth !== adminPwd) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const path = formData.get("path") as string | null;

  if (!file || !path) {
    return NextResponse.json({ error: "Falta archivo o path" }, { status: 400 });
  }

  try {
    const blob = await put(path, file, {
      access: "private",
      allowOverwrite: true,
    });
    // Guardamos la URL interna del blob (pathname)
    return NextResponse.json({ url: blob.url, pathname: blob.pathname });
  } catch (error) {
    console.error("Blob upload error:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
