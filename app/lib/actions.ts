
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createInvoice(place:string, country:string, type:string, temperature:string, distance:string, img:string) {
    // Validate form fields using Zod
 

    // Insert data into the database
    try {
      await sql`
        INSERT INTO locations (place, country, type, temperature, distance, img)
        VALUES (${place}, ${country}, ${type}, ${temperature}, ${distance}, ${img})
      `;
    } catch (error) {
      // If a database error occurs, return a more specific error.
      return {
        message: 'Database Error: Failed to Create Invoice.',
      };
    }
  
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/');
    redirect('/');
}