export function flightEmailTemplate(
    destination: string,
    price: number,
    airlineLogo: string,
    departureTime: string,
    arrivalTime: string,
    flightLink: string,
    stops: number,
    airline: string
  ) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background: #f9f9f9;">
        <!-- Header -->
        <h2 style="color: #ff6600; text-align: center; margin-bottom: 10px;">✈️ Limited-Time Flight Deal!</h2>
        <p style="text-align: center; font-size: 16px; color: #333;">A flight to <strong>${destination}</strong> is now available for <strong style="color: #28a745;">$${price}</strong>!</p>
        
        <!-- Flight Details -->
        <div style="background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
          <div style="display: flex; align-items: center; gap: 15px;">
            <img src="${airlineLogo}" alt="Airline Logo" style="width: 50px; height: 50px; border-radius: 5px;"/>
            <div>
              <p style="margin: 0; font-size: 18px; font-weight: bold; color: #333;">${airline}</p>
              <p style="margin: 0; font-size: 14px; color: #777;">${stops === 0 ? "Non-stop" : `${stops} stop(s)`}</p>
            </div>
          </div>
  
          <hr style="margin: 15px 0; border: 0; height: 1px; background: #ddd;"/>
  
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="text-align: left;">
              <p style="margin: 0; font-size: 14px; color: #777;">Departure</p>
              <p style="margin: 5px 0; font-size: 16px; font-weight: bold; color: #333;">${departureTime}</p>
            </div>
            <div style="text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #777;">Duration</p>
              <p style="margin: 5px 0; font-size: 14px; font-weight: bold; color: #333;">${stops}</p>
            </div>
            <div style="text-align: right;">
              <p style="margin: 0; font-size: 14px; color: #777;">Arrival</p>
              <p style="margin: 5px 0; font-size: 16px; font-weight: bold; color: #333;">${arrivalTime}</p>
            </div>
          </div>
        </div>
  
        <!-- CTA Button -->
        <a href="${flightLink}" target="_blank" 
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
  