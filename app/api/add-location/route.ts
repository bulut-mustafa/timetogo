import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const place = searchParams.get('place');
  const country = searchParams.get('country');
  const type = searchParams.get('type');
  const temperature = searchParams.get('temperature');
  const distance = searchParams.get('distance');
    const img = searchParams.get('img');
 
  try {
    if (!place || !country || !type || !temperature || !distance || !img) throw new Error('All the parameters are required');
    await sql`INSERT INTO locations (place, country, type, temperature, distance, img) VALUES (${place}, ${country}, ${type}
    ,${temperature}, ${distance}, ${img});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const locations = await sql`SELECT * FROM locations;`;
  return NextResponse.json({ locations }, { status: 200 });
}