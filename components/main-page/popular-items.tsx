import Card from "./card";
import { getDestinations } from "@/lib/destinations";

export default async function PopularDestinations() {
    const destinations = await getDestinations(); // Await the promise

    return (
        <>
            <section className="p-12">
                <h2 className="mb-8">Most visited destinations</h2>

                <div className="flex flex-wrap mb-4 -mx-3">
                    {destinations.map((place, i) => (
                        <Card key={i} location={place} />
                    ))}
                </div>
            </section>
        </>
    );
}
