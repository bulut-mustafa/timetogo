"use client";

import React from "react";
import Image from "next/image";
import Tag from "../ui/tag";
import { Location } from "@/lib/types";
import Eye from "@/public/eye.svg";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

interface NewCardProps {
    location: Location;
    showEyeIcon?: boolean;
    onEyeClick?: () => void; // Function to handle clicking the eye button
}

export default function NewCard({ location, showEyeIcon = false, onEyeClick }: NewCardProps) {
    return (
        <div className="group relative w-full sm:h-[360px] h-[240px] rounded-xl overflow-hidden shadow-lg">
            {showEyeIcon && (
                <button
                    className="absolute border border-white top-2 right-2 p-1 z-10 rounded-lg"
                    onClick={onEyeClick}
                >
                    <Image src={Eye} alt="show deal" width={16} height={16} />
                </button>
            )}

            <Image
                src={location.img}
                alt={location.city}
                fill
                className="absolute inset-0 w-full h-full object-cover"
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 400px"
                quality={75} // Reduce file size
                loading="lazy" // Defer loading for non-critical images
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

            <div className="absolute bottom-4 left-4 text-white z-10">
                <div className="mb-2">
                    <Link href={`/destinations/${location.id}`}>
                        <h3 className="text-lg font-semibold">{location.city}</h3>
                    </Link>
                    <p className="text-sm">{location.country}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-white">
                    <Tag tag={location.type} />
                    <Tag tag={location.temperature} />
                    <Tag tag={location.average_cost} />
                </div>
            </div>
        </div>
    );
}
