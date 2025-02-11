import { getDestination } from "@/lib/destinations";
import Header from "@/components/main-page/main-header/header";
import Image from 'next/image';
import LocationGallery from "@/components/location-page/location-images";
interface LocationPageProps {
  params: { locationId: string };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const location = await getDestination(params.locationId);

  
  if (!location) return null; 


  return (
    <>
      
      <Header/>
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold ml-2 mt-8 mb-4">{location.city}</h1>
        <LocationGallery location={location.city}/>
      </div>
    </>
  );
}
