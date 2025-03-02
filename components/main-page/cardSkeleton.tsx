export default function SkeletonCard() {
    return (
        <div className="relative w-full sm:h-[360px] h-[240px] rounded-xl overflow-hidden shadow-lg bg-gray-200 animate-pulse">
            {/* Placeholder for Eye Icon */}
            <div className="absolute top-2 right-2 w-6 h-6 bg-gray-300 rounded-lg"></div>

            {/* Fake Image Placeholder */}
            <div className="absolute inset-0 bg-gray-300"></div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

            {/* Text & Tags Placeholder */}
            <div className="absolute bottom-4 left-4 z-10">
                {/* City & Country Placeholder */}
                <div className="mb-2">
                    <div className="w-24 h-6 bg-gray-400 rounded-md"></div>
                    <div className="w-16 h-4 bg-gray-400 rounded-md mt-1"></div>
                </div>

                {/* Tags Placeholder */}
                <div className="flex flex-wrap gap-2">
                    <div className="w-16 h-5 bg-gray-400 rounded-md"></div>
                    <div className="w-20 h-5 bg-gray-400 rounded-md"></div>
                    <div className="w-14 h-5 bg-gray-400 rounded-md"></div>
                </div>
            </div>
        </div>
    );
}
