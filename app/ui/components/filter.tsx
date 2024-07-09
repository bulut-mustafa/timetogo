"use client";
import React from "react";

export default function Filter({ children }:
    { children?: React.ReactNode; }) {
        const [filters, setFilters] = React.useState({
            type: "",
            temperature: "",
            distance: ""
        });
    
        const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFilters(prevFilters => ({
                ...prevFilters,
                [name]: value
            }));
        };
    
        const resetFilters = () => {
            setFilters({
                type: "",
                temperature: "",
                distance: ""
            });
        };
    return (
        <div className="w-full md:w-1/2">
            <div className="font-normal text-lg pb-8">
                Take me somewhere{filters.type == "" ? "": <span> that has {filters.type}</span>  }{filters.temperature == "" ? "": <span>, and is {filters.temperature}</span>  }.
            </div>
            <div className="flex flex-wrap">
                <div className="w-1/3">
                    <div className=" mb-2 text-gray-500 text-xs font-medium tracking-wide uppercase">
                        type
                    </div>
                    <label className="flex items-center text-gray-700">
                        <input type="radio" name="type" value="nature" 
                            checked={filters.type === "nature"} 
                            onChange={handleFilterChange}  />
                        <span className="ml-2 capitalize">nature</span>
                    </label>
                    <label className="flex items-center text-gray-700">
                        <input type="radio" name="type" value="beach"
                        checked={filters.type === "beach"} 
                        onChange={handleFilterChange} />
                        <span className="ml-2 capitalize">beach</span>
                    </label>
                    <label className="flex items-center text-gray-700">
                        <input type="radio" name="type" value="city"
                        checked={filters.type === "city"} 
                        onChange={handleFilterChange} />
                        <span className="ml-2 capitalize">city</span>
                    </label>
                    <label className="flex items-center text-gray-700">
                        <input type="radio" name="type" value="ski"
                        checked={filters.type === "ski"} 
                        onChange={handleFilterChange} />
                        <span className="ml-2 capitalize">ski</span>
                    </label>
                </div>
                <div className="w-1/3">
                    <div className=" mb-2 text-gray-500 text-xs font-medium tracking-wide uppercase">
                        temperature
                    </div>
                    <label className="flex items-center text-gray-700">
                        <input type="radio" name="temperature" value="hot"
                        checked={filters.temperature === "hot"} 
                        onChange={handleFilterChange} />
                        <span className="ml-2 capitalize">hot</span>
                    </label>
                    <label className="flex items-center text-gray-700">
                        <input type="radio" name="temperature" value="temperate"
                        checked={filters.temperature === "temperate"} 
                        onChange={handleFilterChange} />
                        <span className="ml-2 capitalize">temperate</span>
                    </label>
                    <label className="flex items-center text-gray-700">
                        <input type="radio" name="temperature" value="cold"
                        checked={filters.temperature === "cold"} 
                        onChange={handleFilterChange} />
                        <span className="ml-2 capitalize">cold</span>
                    </label>
                </div>
                <div className="w-1/3">
                    <div className=" mb-2 text-gray-500 text-xs font-medium tracking-wide uppercase">
                        distance
                    </div>
                    <label className="flex items-center text-gray-700">
                        <input type="radio" name="distance" value="short"
                        checked={filters.distance === "short"} 
                        onChange={handleFilterChange} />
                        <span className="ml-2 capitalize">short</span>
                    </label>
                    <label className="flex items-center text-gray-700">
                        <input type="radio" name="distance" value="medium"
                        checked={filters.distance === "medium"} 
                        onChange={handleFilterChange} />
                        <span className="ml-2 capitalize">medium</span>
                    </label>
                    <label className="flex items-center text-gray-700">
                        <input type="radio" name="distance" value="long"
                        checked={filters.distance === "long"} 
                        onChange={handleFilterChange} />
                        <span className="ml-2 capitalize">long</span>
                    </label>
                </div>
            </div>
            <div className="pt-8 flex gap-4">
                <button onClick={() => console.log(filters)} className="bg-sky-400 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded">
                    Let&apos;s go already
                </button>
                <button onClick={resetFilters} className=" hover:text-blue-500 hover:underline text-slate-400 font-normal py-2 px-4">
                    No, reset
                </button>
            </div>
        </div>
    );
}

