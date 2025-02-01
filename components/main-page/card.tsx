import React from "react";
import Image from "next/image";
import Tag from "./tag";
import { Location } from "@/lib/types";

export default function Card({ children, location }: {
    children?: React.ReactNode;
    location: Location;
}) {
    return (
        <div className="w-full lg:w-1/4 sm:w-1/2 mb-3 p-3 group transform transition-all duration-300 relative hover:!opacity-100 hover:z-10 hover:scale-105 group-hover/list:opacity-60">
            <div className="flex flex-col justify-between w-full h-full rounded-xl
            shadow hover:shadow-lg   relative ">
                <div className="flex flex-col justify-between">
                    <div className="w-full">
                        <img
                            src={location.img}
                            alt={location.city}
                            className="transform transition duration-300 hover:scale-110"
                        />
                    </div>
                    <div className="font-semibold text-lg px-4 py-4">
                        {location?.city}, {location.country}
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 px-4 py-6">
                    <Tag icon={location.type} tag={location.type}></Tag>
                    <Tag icon={location.temperature} tag={location.temperature}></Tag>
                </div>
                {children}
            </div>
        </div>

    );
}