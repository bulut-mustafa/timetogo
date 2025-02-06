import { getDestination } from "@/lib/destinations";
interface LocationPageProps {
  params: { locationId: string };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const location = await getDestination(params.locationId);

  
  if (!location) return null; 


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{location.city}</h1>
      <p className="text-gray-600">Country: {location.country}</p>
    </div>
  );
}
