import type { SavedReservation } from "./types";

function formatTime(time: string) {
  return new Date(time).toLocaleTimeString("en", {
    timeStyle: "short",
    hour12: false,
    timeZone: "UTC",
  });
}
function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

function formatDuration(duration: number) {
  const durationMinutes = duration / 60;
  return `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`;
}

export function flightEmailTemplate(
  flight: any,
  reservation: SavedReservation
) {
  const airline = flight.airlines?.[0] || "Unknown Airline";

  const forwardRoute = flight.route.filter((route: any) => route.return === 0);
  const returnRoute = flight.route.filter((route: any) => route.return === 1);

  const unsubscribeLink = `https://timetogo.com/unsubscribe?reservationId=${reservation.id}&destination=${flight.cityTo}`;

  return `
    <div style="max-width: 800px; padding: 8px;">
      <header>
        <a href="">
          <img src="https://timetogo-pictures.s3.ap-southeast-2.amazonaws.com/logo.png" alt="Time to go" style="width: 128px;">
        </a>
      </header>
      <h2 style="color: #ff6600; text-align: center; margin-bottom: 10px;">✈️ Limited-Time Flight Deal!</h2>
      <p style="text-align: center; font-size: 16px; color: #333; margin-bottom: 10px;">A flight from <strong>${
        flight.cityFrom
      }</strong> to <strong>${flight.cityTo}</strong> is available!</p>
      
       <div style="width: 100%; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
       ${forwardRoute.map(
         (route: any) => `
        <div style="border-bottom: 2px solid black; padding: 10px;">
          <div style="display: flex; justify-content: space-between;">
            <div style="padding: 8px 8px 0 8px;">
              <p style="font-size: 16px; font-weight: semibold; color: #333; margin: 0 0 4px 0;">${formatTime(
                route.local_departure
              )}</p>
              <p style="font-size: 12px; color: #333; margin: 0 0 4px 0;">${
                route.cityCodeFrom
              }</p>
              <p style="font-size: 12px; color: #333; white-space: nowrap; margin: 0;">${formatDate(
                route.local_departure
              )}</p>
            </div>
            <div style="text-align: center; padding-top: 8px;">
              <div style="display: flex; align-items: center; justify-content: center;">
                <div style="width: 6px; height: 6px; background-color: white; border: 2px solid black; border-radius: 50%;"></div>
                <div style="width: 32px; height: 1px; background-color: black;"></div>
                <div style="background-color: #2E7D32; color: white; padding: 6px 12px; border-radius: 10px; font-size: 10px; font-weight: semibold;">
                ${
                  forwardRoute.length === 1
                    ? "Direct"
                    : `${forwardRoute.length - 1} Connection${
                        forwardRoute.length > 2 ? "s" : ""
                      }`
                }</div>
                <div style="width: 32px; height: 1px; background-color: black;"></div>
                <div style="width: 6px; height: 6px; background-color: white; border: 2px solid black; border-radius: 50%;"></div>
              </div>
              <p style="text-align: center; font-size: 10px; color: black; margin-top: 4px;">${formatDuration(
                flight.duration.departure
              )}</p>
            </div>
            <div style="padding: 8px 16px 0 16px; text-align: right;">
              <p style="font-size: 16px; font-weight: semibold; color: #333;margin: 0 0 4px 0;">${formatTime(
                route.local_arrival
              )}</p>
              <p style="font-size: 12px; color: #333;margin: 0 0 4px 0;">${
                route.cityCodeTo
              }</p>
              <p style="font-size: 12px; color: #333; white-space: nowrap;margin: 0 0 4px 0;">${formatDate(
                route.local_arrival
              )}</p>
            </div>
          </div>
          <div style="font-size: 12px; padding:0 8px;">Airline: ${route.airline}</div> </div>`
          
       )}
       ${returnRoute.map(
        (route: any) => `
         <div style="padding: 10px;">
           <div style="display: flex; justify-content: space-between;">
             <div style="padding: 8px 8px 0 8px;">
               <p style="font-size: 16px; font-weight: semibold; color: #333; margin: 0 0 4px 0;">${formatTime(
                 route.local_departure
               )}</p>
               <p style="font-size: 12px; color: #333; margin: 0 0 4px 0;">${
                 route.cityCodeFrom
               }</p>
               <p style="font-size: 12px; color: #333; white-space: nowrap; margin: 0;">${formatDate(
                 route.local_departure
               )}</p>
             </div>
             <div style="text-align: center; padding-top: 8px;">
               <div style="display: flex; align-items: center; justify-content: center;">
                 <div style="width: 6px; height: 6px; background-color: white; border: 2px solid black; border-radius: 50%;"></div>
                 <div style="width: 32px; height: 1px; background-color: black;"></div>
                 <div style="background-color: #2E7D32; color: white; padding: 6px 12px; border-radius: 10px; font-size: 10px; font-weight: semibold;">
                 ${
                   returnRoute.length === 1
                     ? "Direct"
                     : `${returnRoute.length - 1} Connection${
                         returnRoute.length > 2 ? "s" : ""
                       }`
                 }</div>
                 <div style="width: 32px; height: 1px; background-color: black;"></div>
                 <div style="width: 6px; height: 6px; background-color: white; border: 2px solid black; border-radius: 50%;"></div>
               </div>
               <p style="text-align: center; font-size: 10px; color: black; margin-top: 4px;">${formatDuration(
                 flight.duration.return
               )}</p>
             </div>
             <div style="padding: 8px 16px 0 16px; text-align: right;">
               <p style="font-size: 16px; font-weight: semibold; color: #333;margin: 0 0 4px 0;">${formatTime(
                 route.local_arrival
               )}</p>
               <p style="font-size: 12px; color: #333;margin: 0 0 4px 0;">${
                 route.cityCodeTo
               }</p>
               <p style="font-size: 12px; color: #333; white-space: nowrap;margin: 0 0 4px 0;">${formatDate(
                 route.local_arrival
               )}</p>
             </div>
           </div>
           <div style="font-size: 12px; padding:0 8px;">Airline: ${route.airline}</div> </div>
         `
      )}
        </div> 
        <div style="padding: 8px 12px; text-align: right;">
          <div style="display: flex; justify-content: space-between;">
            <div style="display: flex; gap: 4px;">
              <div style="">
                <img src="https://timetogo-pictures.s3.ap-southeast-2.amazonaws.com/luggage.svg" alt="luggage" style="height: 24px; width: auto;" />
                <span style="background-color: #FFF; border-radius:50%;">
                :
                  ${flight.bags_price['1']===0 ? 
                    '<img src="https://timetogo-pictures.s3.ap-southeast-2.amazonaws.com/tickMark.svg" alt="tick" style="height: 16px; width: auto;" />'
                    : `<span style="font-size: 12px; font-weight: normal; color: black;">${String(flight.bags_price["1"]).substring(0,2)}$</span>`
                  }
                </span>
              </div>
            </div>
            <p style="font-size: 20px; font-weight: bold; color: #333; padding-bottom: 10px; margin: 4px 0;">€${ flight.price }</p>
          </div>
          <a href="${flight.deep_link}" style="display: block; width: 100%;">
            <button style="width: 100%; padding: 8px 16px; color: blue; border-radius: 6px; border: none; background-color: #ff6600; color: white; font-size: 16px; font-weight: bold; cursor: pointer;">
              Book Now
            </button>
          </a>
        </div>

      <footer style="text-align: start; font-size: 12px; color: #666; margin-top: 20px;">
        <p>If you no longer wish to receive deals for the destination, you can <a href="${unsubscribeLink}" style="color: #ff6600; text-decoration: none;">unsubscribe here</a>.</p>
      </footer>
    </div>
  `;
}
