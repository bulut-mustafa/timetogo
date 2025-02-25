import { getDestination } from "@/lib/destinations";
import Header from "@/components/main-page/main-header/header";
import Image from 'next/image';
import LocationTags from "@/components/location-page/location-tags";
import LocationGallery from "@/components/location-page/location-images";
import SaveLocation from "@/components/location-page/location-saveLocation";
import SavedCards from "@/components/location-page/location-savedCards";
interface LocationPageProps {
  params: { locationId: string };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const location = await getDestination(params.locationId);

  if (!location) return null;


  return (
    <>

      <Header />
      <div className="container mx-auto">
        <div className="flex justify-between  ml-2 mt-8 mb-4">
          <h1 className="text-2xl font-semibold">{location.city}</h1>
        </div>
        <LocationGallery location={location.city} />
      </div>
      <div className="container flex mx-auto p-2 mt-4">
        <div className="text-lg font-bold w-4/6">{location.city}<span className="text-lg text-gray-500 font-semibold">, {location.country}</span>
          <p className="text-gray-400 font-normal text-sm mt-4">{location.description}</p>
          <div className="mt-4">
            <SavedCards location={location}></SavedCards>
          </div>

        </div>
        <div className="w-2/6">
          <LocationTags location={location} />
        </div>
      </div>
    </>
  );
}
