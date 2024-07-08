import React from "react";
import Image from "next/image";
import Tag from "./tag";
export default function Card({ children, title, icon }: {
    children?: React.ReactNode;
    title?: string;
    icon?: string;
}) {
    return (
        <div className="w-full lg:w-1/4 sm:w-1/2 mb-3 p-3 group transform transition-all duration-300 relative hover:!opacity-100 hover:z-10 hover:scale-105 group-hover/list:opacity-60">
            <div className="flex flex-col justify-between w-full h-full rounded-xl
            shadow hover:shadow-lg   relative ">
                <div className="flex flex-col justify-between">
                    <div className="w-full">
                        <img
                            src={`https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                            alt={`Nature`}
                            className="transform transition duration-300 hover:scale-110"
                        />
                    </div>
                    <div className="font-semibold text-lg px-4 py-4">
                        City, Country
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 px-4 py-6">
                    <Tag icon="Nature" tag="Nature"></Tag>
                    <Tag icon="Hot" tag="Hot"></Tag>
                    <Tag icon="Flight" tag="Flight">Long </Tag>
                </div>
                {children}
            </div>
        </div>

    );
}