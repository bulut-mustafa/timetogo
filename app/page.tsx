'use client'
import { useState } from "react";
import Header from "@/components/main-page/main-header/header";
import ClientOnlyHome from "@/components/main-page/home-items";
import SearchBack from "@/components/main-page/main-search/hero-images";
import SearchBar from "@/components/main-page/main-search/search";
import PopularDestinations from "@/components/main-page/popular-items";

const Home = () => {
  const [search, setSearch] = useState("");
  const [temperature, setTemperature] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [averageCost, setAverageCost] = useState<string | null>(null);

  return (
    <main className="min-h-screen items-center">
      <Header />
      <SearchBack />
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
      <ClientOnlyHome />
      <PopularDestinations 
        search={search} 
        temperature={temperature} 
        type={type} 
        averageCost={averageCost} 
      />
    </main>
  );
};

export default Home;
