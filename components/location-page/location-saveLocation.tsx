"use client";
import { useState, useEffect } from "react";
import HeroModal from "../ui/modal";
import Image from "next/image";
import axios from "axios";
import { useDisclosure } from "@heroui/react";
import { now, getLocalTimeZone } from "@internationalized/date";

import { Input, DatePicker, Checkbox, Select,SelectItem } from "@heroui/react";


import { Button } from '@heroui/react'
export default function SaveLocation() {
    const { isOpen, onOpen: openImageModal, onOpenChange } = useDisclosure();
    const [formData, setFormData] = useState({
        from: "",
        to: "",
        latestDate: null,
        maxPrice: "",
        minNights: "",
        maxNights: "",
        directOnly: false,
        maxStepover: "",
        bags: "0",
    });

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        // Call the function to fetch flight deals here
    };
    return (
        <>
            <Button color="primary" onPress={openImageModal}>Listeme Ekle</Button>

            <HeroModal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <div className="p-4">
                    <h1>Save Location</h1>
                    <form onSubmit={handleSubmit} className="p-4 space-y-4 w-full">
                        <div className="flex gap-4">
                            <Input label="Departure" placeholder="Where are you traveling from?" type="text" isRequired
                                value={formData.from} onChange={(e) => handleChange("from", e.target.value)} />
                             <Input label="Destination" placeholder="Where to?" type="text" isRequired
                                value={formData.to} onChange={(e) => handleChange("to", e.target.value)} />
                        </div>
                        <DatePicker
                            hideTimeZone
                            showMonthAndYearPickers
                            defaultValue={now(getLocalTimeZone())}
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
                            <Select
                                label="Bags"
                                value={formData.bags} isRequired
                                onSelectionChange={(value) => handleChange("bags", value)}
                            >
                                <SelectItem > 0</SelectItem>
                                <SelectItem > 1</SelectItem>
                                <SelectItem > 2</SelectItem>
                                <SelectItem > 3</SelectItem>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                            <Input
                                label="Min Nights"
                                placeholder="Minimum nights stayed"
                                type="number"
                                value={formData.minNights}
                                isRequired
                                onChange={(e) => handleChange("minNights", e.target.value)}
                            />
                            </div>

                            <div>
                                <Input
                                    label="Max Nights"
                                    placeholder="Maxiumum nights stayed"
                                    type="number"
                                    value={formData.maxNights}
                                    isRequired
                                    onChange={(e) => handleChange("maxNights", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <Checkbox className="w-1/2"
                                isSelected={formData.directOnly}
                                onValueChange={(value) => handleChange("directOnly", value)}
                                >Direct Flights Only
                            </Checkbox>
                            <Select
                                label="Stepover"
                                isDisabled={formData.directOnly}
                                value={formData.maxStepover}
                                onSelectionChange={(value) => handleChange("maxStepover", value)}
                            >
                                <SelectItem > 0</SelectItem>
                                <SelectItem > 1</SelectItem>
                                <SelectItem > 2</SelectItem>
                            </Select>
                        </div>

                        <Button type="submit" color="primary">Button</Button>
                    </form>
                </div>

            </HeroModal>
        </>
    )
}