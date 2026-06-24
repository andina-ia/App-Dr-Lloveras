import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN ? 
      `✓ presente (${process.env.BLOB_READ_WRITE_TOKEN.slice(0,25)}...)` : 
      "✗ AUSENTE",
    BLOB_STORE_ID: process.env.BLOB_STORE_ID || "✗ AUSENTE",
    NODE_ENV: process.env.NODE_ENV,
  });
}
