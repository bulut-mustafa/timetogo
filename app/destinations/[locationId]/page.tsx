import { getDestination } from "@/lib/destinations";
import Header from "@/components/main-page/main-header/header";
interface LocationPageProps {
  params: { locationId: string };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const location = await getDestination(params.locationId);

  
  if (!location) return null; 


  return (
    <>
      
      <Header/>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-semibold mt-8 mb-4">{location.city}</h1>
        <p className="text-lg text-gray-500 mb-4">{location.country}</p>
        <img src={location.img} alt={location.city} className="w-full rounded-lg" />
      </div>
    </>
  );
}
