'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import beachImg from '@/public/backgrounds/beachbackground.jpg';
import cappaImg from '@/public/backgrounds/cappadociabackground.jpg';
import cityImg from '@/public/backgrounds/citybackground.jpg';
import desertImg from '@/public/backgrounds/desertbackground.jpg';
import forestImg from '@/public/backgrounds/forestbackground.jpg';
import lakeImg from '@/public/backgrounds/lakebackground.jpg';
import mountainImg from '@/public/backgrounds/mountainbackground.jpg';
import snowImg from '@/public/backgrounds/snowmountainbackground.jpg';

const images = [
    { image: beachImg, alt: 'Clear water beach' },
    { image: cappaImg, alt: 'Cappadocia hot air balloons' },
    { image: cityImg, alt: 'Big city' },
    { image: desertImg, alt: 'Sahara desert' },
    { image: forestImg, alt: 'Green forest' },
    { image: lakeImg, alt: 'Mountain lake' },
    { image: mountainImg, alt: 'Mountain' },
    { image: snowImg, alt: 'Snowy mountain' },
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
        <section className="relative w-full mb-8 mx-auto h-[32rem]">
            {/* Background Images */}
            <div className="absolute inset-0 opacity-80 overflow-hidden">
                <div className="relative w-full h-full overflow-hidden">
                    {images.map((image, index) => (
                        <Image
                            key={index}
                            src={image.image}
                            fetchPriority='high'
                            className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 brightness-50 ease-in-out transform ${
                                index === currentImageIndex
                                    ? 'z-10 opacity-100 scale-100 translate-x-0 rotate-0'
                                    : 'opacity-0 scale-110 -translate-x-4 -rotate-0'
                            }`}
                            alt={image.alt}
                        />
                    ))}
                </div>
            </div>

            {/* Text Overlay */}
            <div className="absolute inset-0 flex   z-20">
                <div className=" text-white  p-16 bg-opacity-50  rounded-lg">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Your Next Adventure</h1>
                    <p className="text-lg">
                        Explore breathtaking destinations and make unforgettable memories.
                    </p>
                </div>
            </div>
        </section>
    );
}
