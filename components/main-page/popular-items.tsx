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
                        <div key={i} className="w-full p-4 lg:w-1/4 sm:w-1/2 mb-3  group transform transition-all duration-300 relative hover:!opacity-100   group-hover/list:opacity-60">
                            <Card location={place} />
                        </div>

                    ))}
                </div>
            </section>
        </>
    );
}
