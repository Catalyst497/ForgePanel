"use client"; // This marks the component as a Client Component (required to use hooks in Next.js App Router)
import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useAppStore } from "../hooks/useAppStore"; // Global state store (likely using Zustand)
import { ChevronDownCircle, ChevronLeftCircle } from "lucide-react"; // Icons
import { useRouter } from "next/navigation"; // App Router navigation hook
import { useDoors } from "../assets/requests";
import { Door } from "../Types";
import MainContent from "./MainContent";
import { FallingLines } from "react-loader-spinner";

const Samples = () => {
  // Pulling values & actions from the global store
  const {
    activePosition, // The currently selected door position (index or null)
    materials, // Available materials (from store)
    setActivePosition,
    doorPositions, // Array of "Exterior"/"Interior" strings
    activeModel,
    setActiveModel, // Sets the currently selected door model
  } = useAppStore();
  const { doors, loading, error } = useDoors();

  const router = useRouter();

  // Local component state
  const [doorResults, setDoorResults] = useState<any>([]); // Doors to display in the grid
  const [viewType, setViewType] = useState(1); // 1 = show types, 2 = show specific doors
  const [currentType, setCurrentType] = useState<string | null>(null); // The type currently being browsed

  /**
   * Helper function:
   * From a list of doors, pick only one door per unique type.
   * This is used to show a "type selection" screen rather than every door.
   */
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

  /**
   * Redirect to home ("/") if no position is currently selected.
   * Runs only once on mount.
   */
  useEffect(() => {
    if (activePosition === null) {
      router.push("/");
    }
  }, []);

  /**
   * Whenever `activePosition` changes:
   * - Reset view type to type selection (1)
   * - If exterior: exclude pocket/barn/bifold
   * - If interior: allow all
   * - If activePosition is cleared: reset everything
   */
  useMemo(() => {
    if (activePosition !== null && typeof activePosition === "number") {
      setViewType(1);

      if (doorPositions[activePosition] === "Exterior") {
        const selectedDoors = doors.filter((door) => {
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
        setDoorResults(selectOneDoorPerType(doors));
      }
    }

    // If no position is active, reset the UI
    if (activePosition === null) {
      setCurrentType(null);
      setActiveModel(null);
      setDoorResults([]);
    }
  }, [activePosition, doors]);

  /**
   * Handle when a door type card is clicked.
   * - Filters door list to only doors of that type
   * - Sets the current type for the heading
   */
  const handleTypeClick = (e: any, door: Door) => {
    const typeDoors = doors.filter((lekun) => lekun.type === door.type);
    setDoorResults(typeDoors);
    setCurrentType(door.type);
  };

  /**
   * Handle when a specific door is clicked.
   * - Sets active model in global store (in lowercase)
   */
  const handleDoorClick = (door: Door) => {
    setActiveModel(door.name.toLowerCase());
    router.push(`/samples/${door?.slug}`);
  };

  return (
    <>
      <div className="flex items-center flex-col w-full max-h-screen overflow-y-auto">
        {/* Top navigation/header */}
        <div className="flex justify-center items-center w-full">
          <button
            type="button"
            className="samples-back-btn py-2 px-4 mr-auto flex gap-1"
            onClick={() => {
              setActivePosition(null); // Reset position
              router.back(); // Go back home
            }}
          >
            <ChevronLeftCircle /> <span> Back</span>
          </button>

          <h1
            className={`text-center my-4 ${
              activePosition !== null ? "mr-auto" : ""
            }`}
          >
            Customize Your Dream Door
          </h1>
        </div>

        {/* Main content */}
        <div className="text-[#1f1f1f]"></div>

        {loading && (
          <div className="h-full flex justify-center items-center">
            <div className="mt-[-20rem]">
              <FallingLines
                color="#1f1f1f"
                width="100"
                visible={true}
                aria-label="falling-circles-loading"
              />
            </div>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <MainContent
            activePosition={activePosition}
            currentType={currentType}
            doorResults={doorResults}
            viewType={viewType}
            materials={materials}
            handleTypeClick={handleTypeClick}
            handleDoorClick={handleDoorClick}
          />
        )}
      </div>
    </>
  );
};

export default Samples;
