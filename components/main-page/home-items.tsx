"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/context/auth-context";
import SearchBar from "./main-search/search";
import PopularDestinations from "./popular-items";
import YourDestinations from "./your-items";
import { Location } from "@/lib/types";
import { getDestinations } from "@/lib/destinations";

const ClientOnlyHome = () => {
  const { user, loading } = useAuth();

  const [search, setSearch] = useState("");
  const [temperature, setTemperature] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [averageCost, setAverageCost] = useState<string | null>(null);

  const [destinations, setDestinations] = useState<Location[]>([]);
  const [destinationsLoading, setDestinationsLoading] = useState(true);

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

  
  const filteredDestinations = useMemo(() => {
    return destinations.filter((place) => {
      return (
        (!search ||
          place.city.toLowerCase().includes(search.toLowerCase()) ||
          place.country.toLowerCase().includes(search.toLowerCase())) &&
        (!temperature || place.temperature === temperature) &&
        (!type || place.type === type) &&
        (!averageCost || place.average_cost === averageCost)
      );
    });
  }, [search, temperature, type, averageCost, destinations]);

  return (
    <div>
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

      {user && (
        <YourDestinations
          destinations={filteredDestinations}
          userId={user?.uid || ""}
          loading={loading}
        />
      )}

      <PopularDestinations
        filteredDestinations={filteredDestinations}
        loading={destinationsLoading}
      />
    </div>
  );
};

export default ClientOnlyHome;
