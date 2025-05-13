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
  const { activePosition, setActivePosition, doorPositions } = useAppStore();
  const [doorResults, setDoorResults] = useState<any>([]);
  const [viewType, setViewType] = useState(1);

  function selectOneDoorPerType(doors: Door[]): Door[] {
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
      setViewType(1);
      if (doorPositions[activePosition] === "Exterior") {
        const selectedDoors = doorTypes.filter((door) => {
          if (
            door.type === "pocket" ||
            door.type === "barn" ||
            door.type === "bifold"
          ) {
            return false;
          } else return true;
        });
        setDoorResults(selectOneDoorPerType(selectedDoors));
      }
      if (doorPositions[activePosition] === "Interior") {
        setDoorResults(selectOneDoorPerType(doorTypes));
      }
    }
  }, [activePosition]);

  const handleTypeClick = (e: any, door: Door) => {
    setDoorResults(doorTypes.filter((lekun) => lekun.type === door.type));
    setActivePosition(null);
    setViewType(2);
  };
  // useMemo(() => {console.log(doorResults)}, [doorResults])
  return (
    <div>
      {doorResults.length > 0 ? (
        <div>
          {activePosition !== null && (
            <h2 className="py-2 font-bold">
              What kind of door are we going for?
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {doorResults.map((door: Door, index: number) => {
              return (
                <div
                  key={index}
                  onClick={(e) => handleTypeClick(e, door)}
                  className="relative  shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 w-[15rem]"
                >
                  <img
                    src={door.image}
                    alt={door.name}
                    className="w-full h-[15rem] object-cover"
                  />
                  {viewType === 1 && (
                    <div className="p-2 absolute inset-0 top-auto bg-black/15 backdrop-blur-lg">
                      <h3 className="text-lg font-medium capitalize">
                        {door.type} door
                      </h3>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h2>Please make a selection, and let's get started.</h2>
      )}
    </div>
  );
};

export default Samples;
