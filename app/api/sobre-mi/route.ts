import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'sobreMi.json');
    const raw = await readFile(filePath, 'utf-8');
    const json = JSON.parse(raw);
    return NextResponse.json(json);
  } catch (e) {
    return NextResponse.json(
      { message: 'No se pudo cargar Sobre Mi', error: String(e) },
      { status: 500 }
    );
  }
}
