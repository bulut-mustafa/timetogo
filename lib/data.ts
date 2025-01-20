import { sql } from '@vercel/postgres';
import { Location } from './definitions';

export async function fetchLocations() {
  try {
    const data = await sql`SELECT id, place, country, type, temperature, distance, img FROM locations`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch locations.');
  }
}