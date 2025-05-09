"use client";
import React, { useEffect, useState } from "react";
import { doorTypes } from "../assets/doorTypes";
import { useAppStore } from "../hooks/useAppStore";

const Samples = () => {
  const { activePosition, doorPositions } = useAppStore();
  const [doorResults, setDoorResults] = useState<any>([]);
  useEffect(() => {
    if (activePosition) {
      const results = doorTypes.filter(
        (door) => door.location === doorPositions[activePosition]
      );
      setDoorResults(results);
    }
  }, [activePosition]);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {doorResults.length > 0 ? (
          doorResults.map((door: any, index: number) => (
            <div
              key={index}
              className="bg-white/20 shadow-md overflow-hidden transition-transform hover:scale-105 w-[10rem]"
            >
              <img
                src={door.image}
                alt={door.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium">{door.name}</h3>
              </div>
            </div>
          ))
        ) : (
          <h2>Please make a selection, and let's get started.</h2>
        )}
      </div>
    </div>
  );
};

export default Samples;
