"use client";
import { useState } from "react";
import HeroModal from "../ui/modal";
import { useDisclosure } from "@heroui/react";
import { updateReservation, deleteReservation } from "@/lib/reservations";
import { now, getLocalTimeZone, parseDate, today } from "@internationalized/date";
import type { SavedReservation } from "@/lib/types";
import { Input, DatePicker, Checkbox, Select, SelectItem, Button } from "@heroui/react";
import { toast } from 'react-hot-toast';

interface SaveLocationProps {
    reservation: SavedReservation;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    fetchReservations: () => Promise<void>; // Add this prop
}

export default function ViewReservation({ reservation, isOpen, onOpenChange, fetchReservations }: SaveLocationProps) {
    // Helper function to convert ISO string to DateValue format
    const convertToDateValue = (isoString: string) => {
        const date = new Date(isoString);
        return parseDate(date.toISOString().split("T")[0]); // Extract YYYY-MM-DD
    };
    const [formData, setFormData] = useState({
        userId: reservation.userId,
        userEmail: reservation.userEmail,
        destinationId: reservation.destinationId,
        from: reservation.from,
        to: reservation.to,
        latestDate: convertToDateValue(reservation.latestDate),
        roundFlight: reservation.roundFlight,
        maxPrice: reservation.maxPrice,
        minNights: reservation.minNights,
        maxNights: reservation.maxNights,
        directOnly: reservation.directOnly,
        maxStepover: reservation.maxStepover,
        bags: reservation.bags,
        createdAt: reservation.createdAt,
        updatedAt: reservation.updatedAt,
    });

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const saveFormData = {
            ...formData,
            latestDate: formData.latestDate?.toDate?.(getLocalTimeZone()).toISOString(),
        }
        const data = JSON.parse(JSON.stringify(saveFormData));
        try {
            await updateReservation(reservation.id, data);
            toast.success("Reservation updated successfully");
            await fetchReservations(); // Fetch updated reservations after update
            onOpenChange(false);
        } catch (error) {
            console.error("Error updating reservation", error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteReservation(reservation.id, reservation.destinationId)
            toast.success("Reservation deleted successfully");
            await fetchReservations(); // Fetch updated reservations after delete
            onOpenChange(false);
        } catch (error) {
            console.error("Error deleting reservation", error);
        }
    }
    return (
        <HeroModal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
            <div className="p-4">
                <h1>Save Location</h1>
                <form onSubmit={handleSubmit} className="p-4 space-y-4 w-full">
                    <div className="flex gap-4">
                        <Input
                            label="Departure"
                            placeholder="Where are you traveling from?"
                            type="text"
                            isRequired
                            value={formData.from}
                            onChange={(e) => handleChange("from", e.target.value)}
                        />
                        <Input
                            label="Destination"
                            placeholder="Where to?"
                            type="text"
                            isRequired
                            isReadOnly
                            value={formData.to}
                        />
                    </div>
                    <DatePicker
                        hideTimeZone
                        showMonthAndYearPickers
                        label="Latest Date"
                        variant="bordered"
                        value={formData.latestDate}
                        onChange={(value) => handleChange("latestDate", value)}
                        isRequired
                    />

                    <div className="flex gap-4">
                        <Input
                            label="Max Price"
                            placeholder="0.00"
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">$</span>
                                </div>
                            }
                            type="number"
                            value={formData.maxPrice}
                            isRequired
                            onChange={(e) => handleChange("maxPrice", e.target.value)}
                        />
                        <Input
                            label="Bags"
                            placeholder="0"
                            type="number"
                            value={formData.bags}
                            isRequired
                            onChange={(e) => handleChange("bags", e.target.value)}
                        />
                    </div>

                    <Checkbox
                        className="w-1/2"
                        isSelected={formData.roundFlight}
                        onValueChange={(value) => handleChange("roundFlight", value)}
                        size="sm"
                    >
                        Round Flight
                    </Checkbox>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Input
                                label="Min Nights"
                                placeholder="Minimum nights stayed"
                                type="number"
                                value={formData.minNights}
                                isRequired
                                onChange={(e) => handleChange("minNights", e.target.value)}
                                isDisabled={!formData.roundFlight}
                            />
                        </div>

                        <div>
                            <Input
                                label="Max Nights"
                                placeholder="Maximum nights stayed"
                                type="number"
                                value={formData.maxNights}
                                isRequired
                                onChange={(e) => handleChange("maxNights", e.target.value)}
                                isDisabled={!formData.roundFlight}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <Checkbox
                            className="w-1/2"
                            isSelected={formData.directOnly}
                            onValueChange={(value) => handleChange("directOnly", value)}
                        >
                            Direct Only
                        </Checkbox>
                        <Select
                            label="Stepover"
                            isDisabled={formData.directOnly}
                            value={formData.maxStepover}
                            onSelectionChange={(value) => handleChange("maxStepover", value)}
                        >
                            <SelectItem>0</SelectItem>
                            <SelectItem>1</SelectItem>
                            <SelectItem>2</SelectItem>
                        </Select>
                    </div>
                    <div className="flex gap-4">
                        <Button type="submit" color="primary">
                            Save
                        </Button>
                        <Button type="button" onPress={() => onOpenChange(false)} color="primary" variant="bordered">
                            Cancel
                        </Button>
                        <Button className="ml-auto" type="button" onPress={handleDelete} color="danger" variant="bordered">
                            Delete
                        </Button>
                    </div>
                </form>
            </div>
        </HeroModal>
    );
}
