'use client';
import { Input } from "@heroui/react";
import AutocompleteServer from "./combobox";

const temperatureTags = [
    { label: 'Hot', key: 'hot' },
    { label: 'Temperate', key: 'temperate' },
    { label: 'Cold', key: 'cold' }
];

const typeTags = [
    { label: 'City', key: 'city' },
    { label: 'Beach', key: 'beach' },
    { label: 'Mountain', key: 'mountain' },
    { label: 'Forest', key: 'forest' },
    { label: 'Desert', key: 'desert' },
    { label: 'Island', key: 'island' },
    { label: 'Lake', key: 'lake' },
    { label: 'Historical', key: 'historical' },
    { label: 'Snowy Destination', key: 'snowy' }
];

const averageCostTags = [
    { label: 'Budget', key: 'budget' },
    { label: 'Mid-range', key: 'mid' },
    { label: 'Luxury', key: 'luxury' }
];

interface SearchBarProps {
    search: string;
    setSearch: (value: string) => void;
    temperature: string | null;
    setTemperature: (value: string | null) => void;
    type: string | null;
    setType: (value: string | null) => void;
    averageCost: string | null;
    setAverageCost: (value: string | null) => void;
}

export default function SearchBar({ 
    search, setSearch, 
    temperature, setTemperature, 
    type, setType, 
    averageCost, setAverageCost 
}: SearchBarProps) {
    return (
        <div className="absolute opacity-80 top-80 left-1/2 transform -translate-x-1/2 w-4/5 p-6 bg-white shadow-lg rounded-xl z-50">
            <div className="flex items-center gap-4 justify-center">
                <div className="w-1/4">
                    <Input 
                        size="sm" 
                        name="search" 
                        label="Search a location" 
                        type="text" 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                </div>
                <div className="w-1/4">
                    <AutocompleteServer 
                        tagLabel="Temperature" 
                        tags={temperatureTags} 
                        selected={temperature} 
                        onSelectionChange={setTemperature} 
                    />
                </div>
                <div className="w-1/4">
                    <AutocompleteServer 
                        tagLabel="Type" 
                        tags={typeTags} 
                        selected={type} 
                        onSelectionChange={setType} 
                    />
                </div>
                <div className="w-1/4">
                    <AutocompleteServer 
                        tagLabel="Budget" 
                        tags={averageCostTags} 
                        selected={averageCost} 
                        onSelectionChange={setAverageCost} 
                    />
                </div>
            </div>
        </div>
    );
}
