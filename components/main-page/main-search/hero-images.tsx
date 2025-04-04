'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import beachImg from '@/public/backgrounds/beachbackground_opt.jpg';
import cappaImg from '@/public/backgrounds/cappadociabackground_opt.jpg';
import cityImg from '@/public/backgrounds/citybackground_opt.jpg';
import desertImg from '@/public/backgrounds/desertbackground_opt.jpg';
import forestImg from '@/public/backgrounds/forestbackground_opt.jpg';
import lakeImg from '@/public/backgrounds/lakebackground_opt.jpg';
import mountainImg from '@/public/backgrounds/mountainbackground_opt.jpg';
import snowImg from '@/public/backgrounds/snowmountainbackground_opt.jpg';

const images = [
    { image: beachImg, alt: "Beautiful clear water beach with white sand" },
    { image: cappaImg, alt: "Hot air balloons flying over Cappadocia at sunrise" },
    { image: cityImg, alt: "Skyline of a modern metropolitan city at night" },
    { image: desertImg, alt: "Golden sand dunes under a bright blue sky" },
    { image: forestImg, alt: "Dense green forest with sunlight filtering through trees" },
    { image: lakeImg, alt: "Scenic mountain lake reflecting the sky" },
    { image: mountainImg, alt: "Majestic mountain peak with rugged cliffs" },
    { image: snowImg, alt: "Snow-covered mountain with a clear blue sky" },
];

export default function HeroImages() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex < images.length - 1 ? prevIndex + 1 : 0
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full mb-4 sm:mb-8 mx-auto h-[32rem]">
            {/* Background Images */}
            <div className="absolute inset-0 opacity-80 overflow-hidden">
                <div className="relative w-full h-full overflow-hidden">
                    {images.map((image, index) => (
                        <Image
                            key={index}
                            src={image.image}
                            alt={image.alt}
                            fill
                            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0'}`}
                            priority={index === 0} // Only prioritize the first image
                            loading={index === 0 ? 'eager' : 'lazy'} // Lazy-load other images
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1920px"
                            quality={75} // Reduce file size
                        />
                    ))}
                </div>
            </div>

            {/* Text Overlay */}
            <div className="absolute inset-0 flex z-20">
                <div className="text-white p-8 sm:px-16 bg-opacity-50 rounded-lg">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                        Welcome to Your Next Adventure
                    </h1>
                    <p className="text-lg sm:text-lg">
                        Explore breathtaking destinations and make unforgettable memories.
                    </p>
                </div>
            </div>
        </section>
    );
}
