import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    
  const locations = await sql`SELECT * FROM locations;`;
  return NextResponse.json({ locations }, { status: 200
    , headers: { 'Cache-Control': 'no-cache' }
   });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}