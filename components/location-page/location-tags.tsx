import type { Location } from "@/lib/types";
import Image from 'next/image';

export function Tag({ children, tag, value }: {
    children?: React.ReactNode;
    tag?: string;
    value?: string;
}) {
    return (
        <div className="flex justify-between py-1 w-full">
            <p className="font-light text-sm text-gray-500">{tag}: </p>
            <div className="flex gap-2">
                <div className=" font-semibold flex align-center justify-center capitalize opacity-100"> {children}{value}</div>
                </div>
        </div>
    );
}

export default function LocationTags({ location }: { location: Location }) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <Tag tag="Destination Type" value={location.type} />
            <Tag tag="Best Season" value={location.best_season} />
            <Tag tag="Average Cost" value={location.average_cost} />
            <Tag tag="Temperature" value={location.temperature} />
        </div>
    );
}