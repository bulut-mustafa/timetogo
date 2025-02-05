import React from "react";
import Image from "next/image";
import Tag from "./tag";
import { Location } from "@/lib/types";

export default function NewCard({ children, location }: { 
    children?: React.ReactNode;
    location: Location;
}) {
    return (
        <div className="group relative w-full h-[360px] rounded-xl overflow-hidden shadow-lg">
            {/* Background Image */}
            <Image
                src={location.img}
                alt={location.city}
                className="absolute inset-0 w-full h-full object-cover"
                width={400}
                height={300}
                priority
            />

            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
            
            {/* Text & Tags Container */}
            <div className="absolute bottom-4 left-4 text-white z-10">
                {/* City & Country - Starts at the bottom */}
                <div className="mb-2 ">
                    <h3 className="text-lg font-semibold">{location.city}</h3>
                    <p className="text-sm">{location.country}</p>
                </div>

                {/* Tags - Initially hidden, slides in on hover */}
                <div className="flex flex-wrap gap-2 text-white">
                    <Tag  tag={location.type} />
                    <Tag  tag={location.temperature} />
                    <Tag  tag={location.average_cost} />
                </div>
            </div>  

            {children}
        </div>
    );
}
