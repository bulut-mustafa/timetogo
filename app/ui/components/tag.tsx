import React from "react";
import Image from "next/image";
export default function Tag({ children, tag, icon } : {
    children?: React.ReactNode;
    tag?: string;
    icon?: string;
}){
  return (
    <div className="rounded-xl flex py-1 px-2 bg-slate-300 w-fit"> 
        <Image
            src={`/${icon}.svg`}
            width={24}
            height={24}
            alt={`/${tag}`}
            className="mr-2"
        />
        <div className="text-sm font-light flex flex-col justify-center "> {children}{tag}</div>
    </div>
  );
}