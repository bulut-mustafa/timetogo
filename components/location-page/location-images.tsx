"use client";
import { useState, useEffect } from "react";
import HeroModal from "../ui/modal";
import Image from "next/image";
import axios from "axios";
import { useDisclosure } from "@heroui/react";

export default function LocationGallery({ location }: { location: string }) {

    const [locations, setLocations] = useState<{ id: string; name: string; image: string; user: string }[]>([]);
    const [selectedImage, setSelectedImage] = useState<{ id: string; name: string; image: string; user: string } | null>(null);
    const [galleryPreview, setGalleryPreview] = useState<{ id: string; name: string; image: string; user: string } | null>(null);
    const [loading, setLoading] = useState(true);


    const { isOpen: isImageModalOpen, onOpen: openImageModal, onOpenChange: onImageModalChange } = useDisclosure();
    const { isOpen: isGalleryModalOpen, onOpen: openGalleryModal, onOpenChange: onGalleryModalChange } = useDisclosure();

    // fetch images
    useEffect(() => {
        async function fetchImages() {
            setLoading(true);
            try {
                const response = await axios.get(`/api/unsplash?query=${location}`);
                const data = response.data;

                const formattedLocations = data.map((item: any) => ({
                    id: item.id,
                    name: item.alt_description || "Unknown",
                    image: item.urls.regular,
                    user: item.user.name,
                }));

                setLocations(formattedLocations);
                if (formattedLocations.length > 0) {
                    setGalleryPreview(formattedLocations[0]);
                }
            } catch (error) {
                console.error("Error fetching images:", error);
                setLocations([]);
            } finally {
                setLoading(false);
            }
        }
        fetchImages();
    }, [location]);


    const handleImageClick = (loc: { id: string; name: string; image: string; user: string }) => {
        setSelectedImage(loc);
        openImageModal();
    };


    const handleThumbnailClick = (loc: { id: string; name: string; image: string; user: string }) => {
        setGalleryPreview(loc);
    };

    return (
        <div className="p-0 md:p-2">
            {/* Loading Skeleton */}
            {loading && (
                <div className="md:grid md:grid-cols-4 gap-4 flex md:flex-wrap flex-nowrap overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="relative cursor-pointer min-w-[100%] md:min-w-0 snap-start"
                        >
                            <div className="animate-pulse bg-gray-300 rounded-lg shadow-lg object-cover h-48 w-full"></div>
                            <div className="absolute bottom-1 left-1 w-16 h-4 bg-gray-400 rounded-md"></div>
                        </div>
                    ))}
                </div>
            )}


            {!loading && (
                <div className="md:grid md:grid-cols-4 gap-4 flex md:flex-wrap flex-nowrap overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                    {locations.slice(0, 8).map((loc) => (
                        <div key={loc.id} className="relative cursor-pointer min-w-[100%] md:min-w-0 snap-start" onClick={() => handleImageClick(loc)}>
                            <Image
                                src={loc.image}
                                alt={loc.name}
                                width={400}
                                height={300}
                                quality={75} // Reduce quality slightly
                                loading="lazy" // Improve performance
                                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 400px"
                                className="md:rounded-lg shadow-lg object-cover h-48 w-full"
                            />                            
                            <div className="absolute bottom-1 left-1 text-xs text-white">{loc.user}</div>
                        </div>
                    ))}
                </div>
            )}


            {!loading && locations.length > 8 && (
                <div className="px-2">
                    <button onClick={openGalleryModal} className="mt-2 w-full text-center bg-gray-800 text-white p-2 rounded-lg">
                        Show All Photos
                    </button>
                </div>
            )}

            {/* Modal for Selected Image */}
            <HeroModal size="3xl" isOpen={isImageModalOpen} onOpenChange={onImageModalChange}>
                {selectedImage && (
                    <div className="relative w-full h-[500px] max-w-[800px] mx-auto">
                        <Image
                            src={selectedImage.image}
                            alt="Selected Location"
                            fill
                            className="rounded-lg object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                            priority // Load this immediately when modal is opened
                        />
                    </div>
                )}
            </HeroModal>

            {/* Modal for All Photos  */}
            <HeroModal size="xl" isOpen={isGalleryModalOpen} onOpenChange={onGalleryModalChange}>
                <div className="flex flex-col items-center w-full">

                    {galleryPreview && (
                        <div className="mb-4 w-full max-w-[800px]">
                            <p className="text-lg self-start font-semibold py-2">All Pictures</p>
                            <Image
                                src={galleryPreview.image}
                                alt={galleryPreview.name}
                                width={800}
                                height={500}
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </div>
                    )}


                    <div className="w-full max-w-[800px] overflow-x-auto p-2">
                        <div className="flex gap-2 flex-nowrap">
                            {locations.map((loc) => (
                                <Image
                                    key={loc.id}
                                    src={loc.image}
                                    alt={loc.name}
                                    width={100}
                                    height={75}
                                    quality={60} // Reduce quality for thumbnails
                                    loading="lazy" // Lazy load thumbnails
                                    sizes="(max-width: 600px) 50px, (max-width: 1200px) 75px, 100px" // Responsive sizing
                                    className={`rounded-lg shadow-lg cursor-pointer transition-opacity ${galleryPreview?.id === loc.id ? "border-4 border-blue-500" : "opacity-75 hover:opacity-100"
                                        }`}
                                    onClick={() => handleThumbnailClick(loc)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </HeroModal>

        </div>
    );
}
