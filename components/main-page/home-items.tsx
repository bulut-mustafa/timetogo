'use client';

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import SearchBar from "./main-search/search";
import PopularDestinations from "./popular-items";
import YourDestinations from "./your-items";
import { Location } from "@/lib/types";
import { getDestinations } from "@/lib/destinations";
import SkeletonCard from "./cardSkeleton"; // Import SkeletonCard
import uploadDestinations from "@/baseItems";

const ClientOnlyHome = () => {
  const { user, loading } = useAuth();

  const [search, setSearch] = useState("");
  const [temperature, setTemperature] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [averageCost, setAverageCost] = useState<string | null>(null);


  const [destinations, setDestinations] = useState<Location[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Location[]>([]);
  const [destinationsloading, setDestinationsLoading] = useState(true);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const data = await getDestinations();
        setDestinations(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      } finally {
        setDestinationsLoading(false);
      }
    }
    fetchDestinations();
  }, []);

  // useEffect(() => {
  //   uploadDestinations();
  // }, []);

  // Filter destinations whenever state changes
  useEffect(() => {
    const filtered = destinations.filter((place) => {
      return (
        (search ? place.city.toLowerCase().includes(search.toLowerCase()) || 
            place.country.toLowerCase().includes(search.toLowerCase())
          : true) &&
        (temperature ? place.temperature === temperature : true) &&
        (type ? place.type === type : true) &&
        (averageCost ? place.average_cost === averageCost : true)
      );
    });
    setFilteredDestinations(filtered);
  }, [search, temperature, type, averageCost, destinations]);


  return (
    <div>
      {user ? (
        <div>
        </div>
      ) : (
        <div>
        </div>
      )}


      <SearchBar
        search={search}
        setSearch={setSearch}
        temperature={temperature}
        setTemperature={setTemperature}
        type={type}
        setType={setType}
        averageCost={averageCost}
        setAverageCost={setAverageCost}
      />
      {!user ? "" :
          <YourDestinations
            destinations={filteredDestinations}
            userId={user?.uid || ""}
            loading={loading}
          />
      }

      <PopularDestinations
        filteredDestinations={filteredDestinations}
        loading={destinationsloading}
      />
    </div>
  );
};

export default ClientOnlyHome;
