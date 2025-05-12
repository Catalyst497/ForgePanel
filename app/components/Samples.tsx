"use client";
import React, { useEffect, useState, useMemo } from "react";
import { doorTypes } from "../assets/doorTypes";
import { useAppStore } from "../hooks/useAppStore";

type Door = {
  name: string;
  type: string;
  material: string;
  style: string;
  image?: string;
  location?: string;
};


const Samples = () => {
  const { activePosition, doorPositions } = useAppStore();
  const [doorResults, setDoorResults] = useState<any>([]);


  
  function selectOneDoorPerType(doors:Door[]): Door[]{
  const seenTypes = new Set();
  const result: Door[] = [];

  for (const door of doors) {
    if (!seenTypes.has(door.type)) {
      seenTypes.add(door.type);
      result.push(door);
    }
  }

  return result;
}


  useEffect(() => {
    if (activePosition !== null) {
      if (doorPositions[activePosition] === "Exterior") {
        const selectedDoors = doorTypes.filter((door) => {
          if (door.material === "pocket" || door.material === "barn" || door.material === "bifold") {
            return false
          } else return true;
        })
        setDoorResults(selectOneDoorPerType(selectedDoors))
      }
      if (doorPositions[activePosition] === "Interior") {
        setDoorResults(selectOneDoorPerType(doorTypes))
      }
    }
  }, [activePosition]);

  // useMemo(() => {console.log(doorResults)}, [doorResults])
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {doorResults.length > 0 ? (
          doorResults.map((door: any, index: number) => (
            <div
              key={index}
              className="relative  shadow-md overflow-hidden transition-transform hover:scale-105 w-[10rem]"
            >
              <img
                src={door.image}
                alt={door.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-2 absolute inset-0 top-auto backdrop-blur-lg">
                <h3 className="text-lg font-medium">{door.type}</h3>
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
