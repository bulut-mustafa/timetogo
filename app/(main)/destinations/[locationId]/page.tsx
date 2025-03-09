import { getDestination } from "@/lib/destinations";
import LocationTags from "@/components/location-page/location-tags";
import LocationGallery from "@/components/location-page/location-images";
import SavedCards from "@/components/location-page/location-savedCards";
interface LocationPageProps {
  params: { locationId: string };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const location = await getDestination(params.locationId);

  if (!location) return null;


  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-between  ml-2 mt-8 mb-4">
          <h1 className="text-xl font-semibold">{location.city}<span className="text-xl text-gray-500 font-semibold">, {location.country}</span></h1>
        </div>
        <LocationGallery location={location.city} />
      </div>
      <div className="container flex flex-col mx-auto p-2 mt-4">
        <div className="text-lg font-bold w-full ">
          <p className="text-gray-400 font-normal text-sm ">{location.description}</p>
          

        </div>
        <div className="w-full pt-2">
          <div className="">
            <p className="font-bold text-lg">Things to know</p>
          </div>
          <LocationTags location={location} />
        </div>
        
      </div>
      <div className="container mx-auto mt-4">
            <SavedCards location={location}></SavedCards>
      </div>
    </>
  );
}
