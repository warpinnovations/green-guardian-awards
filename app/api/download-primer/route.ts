import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  
  const filePath = path.join(process.cwd(), "public", "files", "Green Guardian Awards Primer.pdf");
  const file = await fs.readFile(filePath);

  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Green Guardian Awards Primer.pdf"',
      "Content-Length": String(file.length),
    },
  });
}
