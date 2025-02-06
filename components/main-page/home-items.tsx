'use client';

import React, {useState} from "react";
import { useAuth } from "@/context/auth-context";
import SearchBar from "./main-search/search";
import PopularDestinations from "./popular-items";

const ClientOnlyHome = () => {
  const { user, loading } = useAuth();

  const [search, setSearch] = useState("");
  const [temperature, setTemperature] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [averageCost, setAverageCost] = useState<string | null>(null);

  

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
      <PopularDestinations
        search={search}
        temperature={temperature}
        type={type}
        averageCost={averageCost}
      />
    </div>
  );
};

export default ClientOnlyHome;
