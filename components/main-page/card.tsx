import React from "react";
import Image from "next/image";
import Tag from "./tag";
import { Location } from "@/lib/types";

export default function Card({ children, location }: {
    children?: React.ReactNode;
    location: Location;
}) {
    return (
        <div className="w-full lg:w-1/4 sm:w-1/2 mb-3 p-4 group transform transition-all duration-300 relative hover:!opacity-100 hover:z-10 hover:scale-105 group-hover/list:opacity-60">
            <div className="flex flex-col justify-between w-full h-full rounded-xl
               relative ">
                <div className="flex flex-col justify-between">
                    <div className="w-full">
                        <Image
                            src={location.img}
                            alt={location.city}
                            className="w-full h-[250px] object-cover rounded-t-lg"
                            width={400}
                            height={250}
                            priority
                        />

                    </div>
                    <div className="font-semibold text-lg px-4 py-4">
                        {location?.city}, {location.country}
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 px-4 py-6">
                    <Tag icon={location.type} tag={location.type}></Tag>
                    <Tag icon={location.temperature} tag={location.temperature}></Tag>
                    <Tag icon={location.average_cost} tag={location.average_cost}></Tag>
                </div>
                {children}
            </div>
        </div>

    );
}