"use client";
import { useState } from "react";
import { Button } from "../ui/button";

export default function DesignContent() {
  const [selectedShape, setSelectedShape] = useState<
    "circle" | "square" | null
  >("circle");

  return (
    <section className="flex-1 flex justify-center overflow-y-auto bg-[#ebe8e8] mt-4 w-full pb-24">
      <div className="w-full max-w-md md:max-w-2xl space-y-4 p-4">
        <div className="bg-white flex flex-col mx-auto w-full rounded-md shadow-xl p-4">
          <h1 className="text-lg font-semibold mb-4">Profile Picture Shape</h1>
          {/* section profile shape */}
          <div className="flex flex-row items-center justify-center gap-6">
            {/* Circle Option */}
            <div
              onClick={() => setSelectedShape("circle")}
              className={`flex justify-center items-center border rounded-lg h-24 w-24 cursor-pointer transition ${
                selectedShape === "circle"
                  ? "border-black ring-2 ring-black"
                  : "border-gray-400"
              }`}
            >
              <div
                className={`h-12 w-12 ${
                  selectedShape === "circle" ? "bg-black" : "bg-gray-500"
                } rounded-full`}
              ></div>
            </div>

            {/* Square Option */}
            <div
              onClick={() => setSelectedShape("square")}
              className={`flex justify-center items-center border rounded-lg h-24 w-24 cursor-pointer transition ${
                selectedShape === "square"
                  ? "border-black ring-2 ring-black"
                  : "border-gray-400"
              }`}
            >
              <div
                className={`h-12 w-12 ${
                  selectedShape === "square" ? "bg-black" : "bg-gray-500"
                } rounded-lg`}
              ></div>
            </div>
          </div>
        </div>
        {/* section button */}
        <div className="bg-white flex flex-col mx-auto w-full rounded-md shadow-xl p-4">
          <h1 className="text-lg font-semibold mb-4">Button Shape</h1>
          <div className="grid grid-cols-3 gap-6 place-items-center">
            {/* Fill Buttons */}
            <Button className="rounded-full md:h-10 h-8 w-full"></Button>
            <Button className="rounded-md md:h-10 h-8 w-full"></Button>
            <Button className="rounded-none md:h-10 h-8 w-full"></Button>

            {/* Outline Buttons */}
            <Button
              variant="outline"
              className="rounded-full md:h-10 h-8 w-full"
            ></Button>
            <Button
              variant="outline"
              className="rounded-md md:h-10 h-8 w-full"
            ></Button>
            <Button
              variant="outline"
              className="rounded-none md:h-10 h-8 w-full"
            ></Button>
          </div>
        </div>
      </div>
    </section>
  );
}
