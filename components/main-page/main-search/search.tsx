'use client';
import Combobox from './combobox';
import { Button } from '@heroui/button';
import { DateRangePicker } from "@heroui/react";
const animals = [
    { label: 'Giraffe', key: 'giraffe' },
    { label: 'Dolphin', key: 'dolphin' },
    { label: 'Penguin', key: 'penguin' },
    { label: 'Zebra', key: 'zebra' },
    { label: 'Shark', key: 'shark' },
    { label: 'Whale', key: 'whale' },
    { label: 'Otter', key: 'otter' },
    { label: 'Crocodile', key: 'crocodile' },
];
export default function SearchBar() {
    return (
        <>
            <div className="flex justify-center mx-auto">
                <div className="flex items-center gap-4 justify-center">
                    <div className="">
                        <Combobox animals={animals} />
                    </div>
                    <div className="">
                        <Combobox animals={animals} />
                    </div>
                    <div  className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <DateRangePicker className="max-w-xs" visibleMonths={2} label="Stay duration" variant={'flat'} />
                    </div>
                    <div className="">
                    </div>

                    <div className="">
                        <Button>Click me</Button>
                    </div>
                </div>
            </div>
        </>
    );
}