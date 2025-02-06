export default function SkeletonCard() {
    return (
        <div className="relative w-full h-[360px] rounded-xl overflow-hidden shadow-lg bg-gray-200 animate-pulse">
            {/* Fake Image Placeholder */}
            <div className="absolute inset-0 bg-gray-300"></div>

            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/5 to-transparent"></div>

            {/* Text & Tags Placeholder */}
            <div className="absolute bottom-4 left-4 z-10">
                {/* City & Country Placeholder */}
                <div className="mb-2">
                    <div className="w-32 h-5 bg-gray-400 rounded-md"></div>
                    <div className="w-24 h-4 bg-gray-400 rounded-md mt-1"></div>
                </div>

                {/* Tags Placeholder */}
                <div className="flex gap-2">
                    <div className="w-16 h-5 bg-gray-400 rounded-md"></div>
                    <div className="w-20 h-5 bg-gray-400 rounded-md"></div>
                    <div className="w-14 h-5 bg-gray-400 rounded-md"></div>
                </div>
            </div>
        </div>
    );
}
