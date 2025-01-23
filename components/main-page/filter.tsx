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
            <h1>COMING SOON</h1>
        </div>
    );
}

