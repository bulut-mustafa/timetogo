import React from "react";
import Image from "next/image";
import { Tooltip, Button } from "@heroui/react";

export default function Tag({ children, tag, icon }: {
  children?: React.ReactNode;
  tag?: string;
  icon?: string;
}) {
  const titleTag = (tag ?? "").charAt(0).toUpperCase() + (tag ?? "").slice(1);
  return (
    <Tooltip content={titleTag}>

      <div className="rounded-lg flex py-1 px-2 bg-slate-100 w-fit">
        <Image
          src={`/tags/${icon}.svg`}
          width={24}
          height={24}
          alt={`/${tag}`}
          className=""
        />
      </div>
    </Tooltip>
  );
}