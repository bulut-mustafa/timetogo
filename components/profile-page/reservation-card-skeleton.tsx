export default function ReservationCardSkeleton() {
    return (
        <div className="animate-pulse bg-gray-200 rounded-lg p-4 shadow-md flex justify-between">
            <div className="w-1/2">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="w-1/2 text-right">
                <div className="h-4 bg-gray-300 rounded w-2/3 mb-2 ml-auto"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3 ml-auto"></div>
            </div>
        </div>
    );
}
