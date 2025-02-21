import { Button } from "@heroui/react";
import type { User, SavedReservation } from "@/lib/types";

export default function SavedCard({saved}:{saved:SavedReservation}) {
    return (
        <div className="flex flex-col justify-between bg-white rounded-lg p-4 border border-slate-200 w-full mx-2">
            <div className="flex justify-between p-2 text-sm font-light">
                <p className="">{saved.from}</p>
                <span>{'-->'}</span>
                <p>{saved.to}</p>
            </div>
            <div className="flex justify-between p-2 text-sm gap-4 font-light">
                <div>
                    <p>{saved.latestDate.substring(0, 10)}</p>
                </div>
                <p className="self-end">${saved.maxPrice}</p>
            </div>
            <div className="self-end">
                <Button color="primary" size="sm">View</Button>
            </div>
        </div>
    );
}