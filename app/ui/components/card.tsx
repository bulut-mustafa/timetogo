import React from "react";
import Image from "next/image";

export default function Card({ children, title, icon} : {
    children?: React.ReactNode;
    title?: string;
    icon?: string;
}){
  return (
    <div className="rounded-xl flex py-1 px-2 bg-slate-300 w-fit"> 
        <Image
            src={`/${icon}.svg`}
            alt={`/${title}`}
            className="mr-2"
        />
        <div className="flex flex-col justify-start p-2"></div>
        {children}
    </div>
  );
}