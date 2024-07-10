
'use server';

import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

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
    revalidatePath('/');
    return NextResponse.json({ message: 'Location added successfully' }, { status: 200 ,
      headers: { 'Cache-Control': 'no-cache' }
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
}

