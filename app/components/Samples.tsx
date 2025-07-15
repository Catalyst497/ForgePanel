"use client";
import React, { useEffect, useState, useMemo } from "react";
import { doorTypes } from "../assets/doorTypes";
import { useAppStore } from "../hooks/useAppStore";
import Customizer from "./Customizer";
import { ChevronDownCircle, ChevronLeftCircle } from "lucide-react";

type Door = {
  name: string;
  type: string;
  material: string;
  style: string;
  image?: string;
  location?: string;
};

const Samples = () => {
  const {
    activePosition,
    materials,
    setActivePosition,
    doorPositions,
    activeModel,
    setActiveModel,
  } = useAppStore();
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

  useMemo(() => {
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
     if (activePosition === null) {
      setCurrentType(null);
      setDoorResults([]);
      setActiveModel(null);
    }
  }, [activePosition]);
 
  const handleTypeClick = (e: any, door: Door) => {
    const typeDoors = doorTypes.filter((lekun) => lekun.type === door.type);
    setDoorResults(typeDoors);
    setCurrentType(door.type);
    // setActivePosition(null);
    setViewType(2);
  };
  const handleDoorClick = (door: Door) => {
    // setActivePosition(null);
    if (door.material === "wood") setActiveModel("new-door");
    if (door.type === "double" && door.material === "metal")
      setActiveModel("double-metal");
    if (door.type === "double" && door.material.toLowerCase() === "pvc")
      setActiveModel("double-pvc");
    if(door.type === "sliding" && door.material.toLowerCase() === "glass")
      setActiveModel("sliding-glass")
  };
  return (
    <>
      <div className="vl mx-4 h-[80vh] w-[1px] bg-gray-300"></div>
      <div className="flex items-center flex-col w-full max-h-screen overflow-y-auto">
        <div className="flex justify-center items-center w-full">
          {activePosition !== null && (
            <button
              type="button"
              className="samples-back-btn py-2 px-4 mr-auto flex gap-1"
              onClick={() => setActivePosition(null)}
            >
              <ChevronLeftCircle className="" /> <span> Back</span>
            </button>
          )}
          <h1
            className={`text-center my-4 ${
              activePosition !== null ? "mr-auto" : ""
            } `}
          >
            Customize Your Dream Door
          </h1>
        </div>
        <div>
          {doorResults.length > 0 ? (
            <div>
              {(typeof activePosition === "number" && !currentType) && (
                <h2 className="py-2 mb-4 font-semibold">
                  What kind of door are we going for?
                </h2>
              )}
              {currentType && (
                <h2 className="py-2 font-semibold">
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
                      if (material) {
                      }
                      return (
                        <div key={i} className="mb-12">
                          <div className="mt-4 mb-4 ">
                            <h3 className="capitalize">{material}?</h3>
                            <div className="w-[90%] h-[1px] bg-gray-400/50 my-2"></div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {materialDoors.map((door: Door, i: number) => (
                              <div
                                key={i}
                                onClick={() => handleDoorClick(door)}
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
              {!currentType && (
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
                            <h3 className="text-lg text-white font-medium capitalize">
                              {door.type} door
                            </h3>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <Customizer />
          )}
        </div>
      </div>
    </>
  );
};

export default Samples;
