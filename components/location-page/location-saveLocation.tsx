"use client";
import { useState, useEffect } from "react";
import HeroModal from "../ui/modal";
import { useDisclosure } from "@heroui/react";
import { now, getLocalTimeZone, today } from "@internationalized/date";
import type { Location } from "@/lib/types";
import { Input, DatePicker, Checkbox, Select, SelectItem } from "@heroui/react";
import { useAuth } from "@/context/auth-context";
import { addReservation } from "@/lib/reservations";
import { Button } from "@heroui/react";

export default function SaveLocation({ location, onSave }: { location: Location, onSave: () => void }) {
    const { user, loading } = useAuth();
    const { isOpen, onOpen: openImageModal, onOpenChange } = useDisclosure();
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        destinationId: location.id,
        from: "",
        fromIata: "",
        to: location.city,
        toIata: location.iata,
        latestDate: today(getLocalTimeZone()).add({ months: 6 }),
        maxPrice: "",
        roundFlight: false,
        minNights: "",
        maxNights: "",
        directOnly: false,
        maxStepover: "",
        bags: "",
    });

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleOpenModal = () => {
        if (!user) {
            setError("You need to log in to save a location.");
            return;
        }
        setError(null);
        openImageModal();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const saveFormData = {
            ...formData,
            latestDate: formData.latestDate?.toDate?.(getLocalTimeZone()).toISOString(),
            maxStepover: formData.directOnly ? 0 : formData.maxStepover,
        }
        if (user?.uid && user?.email) {
            addReservation(user.uid, user.email, saveFormData)
                .then((data) => {
                    onSave();
                    onOpenChange();
                })
                .catch((error) => {
                    console.error("Error adding reservation", error);
                    setError("Error adding reservation");
                });
        } else {
            setError("User information is missing.");
        }
    };

    return (
        <>
            <div className="flex flex-col items-end">
                <Button className="" color="primary" onPress={handleOpenModal}>
                    New Reservation
                </Button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

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
                                Direct Flights Only
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

                        <Button type="submit" color="primary">
                            Save Location
                        </Button>
                    </form>
                </div>
            </HeroModal>
        </>
    );
}
