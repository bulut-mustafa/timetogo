import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const result = await sql`
      DELETE
      FROM locations 
      WHERE id in (
          SELECT id 
          FROM locations 
          ORDER BY id desc
          LIMIT 1
        );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}