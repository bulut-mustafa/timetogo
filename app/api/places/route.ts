import { NextResponse } from "next/server";
import axios from "axios";

const PLACES_API_KEY = process.env.PLACES_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "things to do in bangkok";

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`, {
        params: {
          query: query,
          language: "en",
          key: PLACES_API_KEY,
        }
      }
    );

    console.log("Places API Response:", response.data.results); // Check the response here
    return NextResponse.json(response.data.results);
  } catch (error) {
    console.error('Error fetching places:', error);
    return NextResponse.json({ error: "Failed to fetch places" }, { status: 500 });
  }
}
