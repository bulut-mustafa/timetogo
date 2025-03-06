import { getAllReservations } from "@/lib/reservations";
import { getDestinations } from "@/lib/destinations";
import nodemailer from "nodemailer";
import axios from "axios";
import { flightEmailTemplate } from "@/lib/email-template";
import type { SavedReservation, Location } from "@/lib/types";
import { NextResponse } from "next/server";
const TEQUILA_ENDPOINT = "https://tequila-api.kiwi.com";
const TEQUILA_HEADERS = {
  apikey: process.env.TEQUILA_API_KEY,
};

function formatDate(date: string) {
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
}

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER_TTG,
    pass: process.env.EMAIL_PASS_TTG,
  },
});

async function sendEmail(to: string, subject: string, html: string) {
  await transporter.sendMail({
    from: `"Flight Alerts" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html, // HTML email content
  });
}
async function getIataCode(city: string) {
    try {
      const location_endpoint = `${TEQUILA_ENDPOINT}/locations/query`;
      const query = {
        term: city,
        location_types: "city",
      };
      const config = {
        headers: TEQUILA_HEADERS,
        params: query,
      };
  
      const response = await axios.get(location_endpoint, config);
      const result = response.data.locations;
      
      if (!result || result.length === 0) {
        console.warn(`No IATA code found for city: ${city}`);
        return null;
      }
  
      return result[0].code;
    } catch (error) {
      console.error("Error fetching IATA code:", error);
      return null;
    }
  }
  

async function getCheapestFlight(reservation: SavedReservation) {
    try {
      const from = await getIataCode(reservation.from);
      const latestDate = formatDate(reservation.latestDate);
      const earliestDate = formatDate(reservation.earliestDate);
      const searchEndpoint = `${TEQUILA_ENDPOINT}/v2/search`;
      const oneWayQuery = {
        fly_from: from,
        fly_to: reservation.toIata,
        date_from: earliestDate,
        date_to: latestDate,
        flight_type: "oneway",
        one_for_city: 1,
        max_stopovers: reservation.maxStepover,
        curr: "USD",
        adult_hold_bag: reservation.bags,
      };
      const roundQuery = {
        fly_from: from,
        fly_to: reservation.toIata,
        date_from: earliestDate,
        date_to: latestDate,
        flight_type: "round",
        one_for_city: 1,
        max_stopovers: reservation.maxStepover,
        nights_in_dst_from: reservation.minNights,
        nights_in_dst_to: reservation.maxNights,
        curr: "USD",
        adult_hold_bag: reservation.bags,
      };
      
      const config = {
        headers: TEQUILA_HEADERS,
        params: reservation.roundFlight ? roundQuery : oneWayQuery,
      };
  
      const response = await axios.get(searchEndpoint, config);
      if (!response.data || response.data.data.length === 0) {
        console.warn(`No flights found for reservation from ${from} to ${reservation.toIata}`);
        return null;
      }
  
      return response.data.data[0];
    } catch (error) {
      console.error("Error fetching cheapest flight:", error);
      return null;
    }
  }
  
  export async function GET() {
    try {
      const allReservations = await getAllReservations();
      const flightDeals = [];
  
      for (const reservation of allReservations) {
        const flight = await getCheapestFlight(reservation);
        
        if (flight && flight.price < reservation.maxPrice) {
          // Construct Email Content
  
          flightDeals.push(flight);
  
          // Send Email
          const emailContent = flightEmailTemplate(
            flight,
            reservation,
          );
          await sendEmail(reservation.userEmail, "🔥 Flight Price Alert!", emailContent);
          console.log(`Email sent to ${reservation.userEmail}`);
        }
      }
  
      // Return flight deals as JSON response
      return new Response(JSON.stringify({ flightDeals }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
  
    } catch (error) {
      console.error(error);
      return new Response("Error checking flights", { status: 500 });
    }
  }
  
