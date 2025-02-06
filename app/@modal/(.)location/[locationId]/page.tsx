
import { getDestination } from "@/lib/destinations";
import LocationModal from "@/components/ui/modal";
import { Location } from "@/lib/types"; // Import the Location type

interface PageProps {
  params: { locationId: string };
}

export default async function LocationModalPage({ params }: PageProps) {
  const location = await getDestination(params.locationId);


  if (!location) return null; // Avoid rendering errors if location is null

  return (
    <LocationModal>
      <h2 className="mb-4">{location.city}</h2>
      <p>{location.country}</p>
    </LocationModal>
  );
}
