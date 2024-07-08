'use client';

import Image from "next/image";
import React from "react";
import Card from "./ui/components/card";
import Filter from "./ui/components/filter";
export default function Home() {
  return (
    <main className="min-h-screen items-center p-24">
      <div className="flex flex-wrap justify-between">
        <Filter></Filter>
        <div className="md:w-1/2 w-full">
          <img
            src={`https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
            alt={`Nature`}
            className=""
          />
        </div>
      </div>
      <div className="text-2xl py-4 font-medium">Places you can go to...</div>
      <div className="flex flex-wrap mb-4 -mx-3 group/list">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </main>
  );
}
