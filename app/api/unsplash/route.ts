import { NextResponse } from "next/server";
import axios from "axios";

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY; // Store key in .env.local

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "popular destinations";

  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query: query,
        per_page: 10,
        orientation: "landscape",
        client_id: UNSPLASH_ACCESS_KEY,
        orderBy: "relevant",
      },
    });

    return NextResponse.json(response.data.results);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}
