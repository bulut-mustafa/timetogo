import Image from "next/image";
import React from "react";
import Tag from "./ui/components/tag";
export default function Home() {
  return (
    <main className="min-h-screen items-center p-24">
      <Tag icon="Flight" tag="Flight"></Tag>
    </main>
  );
}
