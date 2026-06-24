import { NextResponse } from "next/server";

// Proxy para servir archivos privados de Vercel Blob
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  
  if (!url) return new NextResponse("Falta url", { status: 400 });

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return new NextResponse("Token no configurado", { status: 500 });

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return new NextResponse("Forbidden", { status: res.status });

    const contentType = res.headers.get("content-type") || "application/octet-stream";
    const body = res.body;

    return new NextResponse(body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, max-age=3600",
        "Content-Disposition": res.headers.get("content-disposition") || "inline",
      },
    });
  } catch (e) {
    return new NextResponse("Error", { status: 500 });
  }
}
