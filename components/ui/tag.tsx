import React from "react";
import Image from "next/image";

export default function Tag({ children, tag,  }: {
  children?: React.ReactNode;
  tag?: string;
}) {
  return (
    <div className="rounded-xl flex py-1 px-2 text-white w-fit opacity-80 border-white border">
      <Image
        src={`/tags/${tag}.svg`}
        width={24}
        height={24}
        alt={`/${tag}`}
        className="mr-2"
      />
      <div className="text-sm font-light flex align-center justify-center capitalize opacity-100"> {children}{tag}</div>
    </div>
  );
}