import type { SavedReservation } from "./types";

export function flightEmailTemplate(
    flight: any,
    reservation: SavedReservation,
  ) {

    const departureTime = new Date(flight.departure_time).toLocaleTimeString('en',
        { timeStyle: 'short', hour12: false, timeZone: 'UTC' });
    const arrivalTime = new Date(flight.arrival_time).toLocaleTimeString('en',
        { timeStyle: 'short', hour12: false, timeZone: 'UTC' });

    const departureDay = new Date(flight.departure_time).toLocaleDateString('en',
        { day: 'numeric', month: 'long', timeZone: 'UTC' });
    const arrivalDay = new Date(flight.arrival_time).toLocaleDateString('en',
        { day: 'numeric', month: 'long', timeZone: 'UTC' });

    const hours = Math.floor(flight.duration / 60);
    const minutes = flight.duration % 60;
    const formattedDuration = `${hours}h ${minutes}m`;
    
    
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <!-- Header -->
        <h2 style="color: #ff6600; text-align: center; margin-bottom: 10px;">✈️ Limited-Time Flight Deal!</h2>
        <p style="text-align: center; font-size: 16px; color: #333;">A flight to <strong>${flight.cityTo}</strong> is now available for <strong style="color: #28a745;">$${flight.price}</strong>!</p>
        
        <!-- Flight Details -->
        <div style="padding: 16px; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
          <div>
            <div>
                <div>
                    <div>
                        
                    </div>
                    <div>
                    </div>
                </div>
                <div>
                    <div>
                    </div>
                    <div>
                    </div>
                </div>
                <div>
                    <div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
            <div>
            ${flight.airline}
            </div>
          </div>

          <div>

          </div>
        </div>
  
        <!-- CTA Button -->
        <a href="${flight.deep_link}" target="_blank" 
           style="display: block; text-align: center; margin-top: 20px; padding: 12px 20px; background-color: #ff6600; 
           color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
          ✈️ Book Now
        </a>
  
        <!-- Footer -->
        <p style="margin-top: 20px; font-size: 14px; color: #555; text-align: center;">
          Prices change quickly! Secure your seat now before the deal expires.
        </p>
      </div>
    `;
  }
  