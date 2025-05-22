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
  const { activePosition, materials, setActivePosition, doorPositions, activeModel, setActiveModel } =
    useAppStore();
  const [doorResults, setDoorResults] = useState<any>([]);
  const [viewType, setViewType] = useState(1);
  const [currentType, setCurrentType] = useState<string | null>(null);

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
    if (activePosition !== null && typeof activePosition === "number") {
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
    const typeDoors = doorTypes.filter((lekun) => lekun.type === door.type);
    setDoorResults(typeDoors);
    setCurrentType(door.type);
    setActivePosition("remove");
    setViewType(2);
  };
  const handleDoorClick = (material: string) => {
    if(material !== "wood") return;
    setActiveModel("new-door")
  }
  return (
    <div>
      {doorResults.length > 0 ? (
        <div>
          {typeof activePosition === "number" && (
            <h2 className="py-2 font-bold">
              What kind of door are we going for?
            </h2>
          )}
          {currentType && (
            <h2 className="py-2">
              So, we are going for {currentType} doors, hmm?
            </h2>
          )}
          {currentType && (
            <div className="">
              {materials.map((material, i: number) => {
                const materialDoors = doorResults.filter(
                  (door: Door) => door.material === material
                );
                if (materialDoors.length) {
                  if(material){}
                  return (
                    <div key={i} className="mb-12">
                      <div className="mt-4 mb-4 ">
                        <h3 className="capitalize">{material}?</h3>
                        <div className="w-[90%] h-[1px] bg-gray-100/30 my-2"></div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {materialDoors.map((door: Door, i: number) => (
                          <div
                            key={i}
                            onClick={() => handleDoorClick(material)}
                            className="relative  shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 w-[15rem]"
                          >
                            <img
                              src={door.image}
                              alt={door.name}
                              className="w-full h-[15rem] object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          )}
          {!currentType && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
          </div>}
        </div>
      ) : (
        <h2>Please make a selection, and let's get started.</h2>
      )}
    </div>
  );
};

export default Samples;
