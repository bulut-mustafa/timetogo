"use client"; // Ensure this runs on the client side

import React from "react";
import Image from "next/image";
import Tag from "./tag";
import { Location } from "@/lib/types";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function NewCard({ location }: { location: Location }) {

    

    return (
        <div
            className="group relative w-full h-[360px] rounded-xl overflow-hidden shadow-lg"
        >
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

            {/* Text & Tags */}
            <div className="absolute bottom-4 left-4 text-white z-10">
                <div className="mb-2">
                    <Link href={`/location/${location.id}`}>
                        <h3 className="text-lg font-semibold">{location.city}</h3>
                    </Link>
                    <p className="text-sm">{location.country}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 text-white">
                    <Tag tag={location.type} />
                    <Tag tag={location.temperature} />
                    <Tag tag={location.average_cost} />
                </div>
            </div>
        </div>
    );
}
