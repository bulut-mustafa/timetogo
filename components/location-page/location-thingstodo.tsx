'use client';
import { useEffect, useState } from "react";
import { Place } from "@/lib/types"; 

export default function ThingsToDo() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch(
          `/api/places?query=things+to+do+in+bangkok`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch places");
        }

        const data = await response.json();
        setPlaces(
          data.map((place: any) => ({
            name: place.name,
            address: place.formatted_address,
            rating: place.rating || "N/A",
          }))
        );
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Things to Do in Bangkok</h1>
      <ul>
        {places.map((place, index) => (
          <li key={index} className="border-b py-2">
            <h2 className="text-lg font-semibold">{place.name}</h2>
            <p className="text-gray-600">{place.address}</p>
            <p className="text-yellow-500">⭐ {place.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
