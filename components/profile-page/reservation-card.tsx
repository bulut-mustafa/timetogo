import type { SavedReservation } from "@/lib/types";

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  }

export default function ReservationCard({ reservation }: { reservation: SavedReservation }) {
    return (
        <div className="flex p-4 border rounded-lg shadow-md items-center ">
            {/* Left Side - Departure */}
            <div className="flex flex-col w-1/3 sm:w-1/5 lg:w-1/6 text-center items-center">
                <p className="flex items-center gap-2">
                    {reservation.from}
                    <img src="/destination.svg" alt="destination" className="w-6 h-6" />
                </p>
            </div>

            {/* Center - Flight Path Animation */}
            <div className="relative w-1/3 sm:w-2/5 lg:w-1/6 flex justify-center items-center">
                <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Dashed Flight Path */}
                    <path
                        d="M10 30 Q60 0, 110 30" 
                        stroke="#4A90E2" 
                        strokeWidth="2" 
                        fill="transparent"
                        strokeDasharray="5 5"
                        id="flightPath"
                    />
                    
                    {/* Moving Plane */}
                    <image 
                        xlinkHref="/plane.svg"
                        width="20"
                        height="20"
                        transform="translate(-10, -10)"
                    >
                        <animateMotion 
                            repeatCount="indefinite" 
                            dur="3s"
                        >
                            <mpath href="#flightPath" />
                        </animateMotion>
                    </image>
                </svg>
            </div>

            {/* Right Side - Destination */}
            <div className="flex flex-col w-1/3 sm:w-1/5 lg:w-1/6 items-center">
                <p className="flex items-center gap-2">
                    <img src="/destination.svg" alt="destination" className="w-6 h-6" />
                    {reservation.to}
                </p>
            </div>
            <div className="hidden sm:flex flex-col text-center sm:w-1/5 lg:w-1/6 gap-2">
                <p className="text-sm text-gray-500">${reservation.maxPrice}</p>
            </div>
            <div className="hidden md:flex flex-col lg:flex-row md:w-2/5 lg:w-1/2 gap-2">
                <div className="lg:w-1/2 text-center">
                    <p className="text-sm text-gray-500">{formatDate(reservation.earliestDate)}</p>
                </div>
                <div className="lg:w-1/2 text-center">
                    <p className="text-sm text-gray-500">{formatDate(reservation.latestDate)}</p>
                </div>
            </div>
            
        </div>
    );
}
