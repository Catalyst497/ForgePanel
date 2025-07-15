"use client";
import React, { useState } from "react";
import { useAppStore } from "../hooks/useAppStore";

const Customizer = () => {
  const { activePosition, doorPositions, setActivePosition } = useAppStore();

  return (
    <>
      {activePosition !== "remove" && (
        <div className="p-4 rounded-sm backdrop-blur-lg bg-transparent font-semibold">
          <div className="">
            <div className="">Where is the door going to be placed?</div>
            <div className="flex justify-center gap-4 mt-4">
              {doorPositions.map((position, i) => {
                const clicked = activePosition === i ? true : false;
                return (
                  <button
                    className={`px-4 py-2 rounded-sm border-[1px] hover:scale-[1.05] duration-[.3s] ${
                      clicked ? "bg-white text-[var(--color-pri)]" : ""
                    }`}
                    type="button"
                    onClick={() => setActivePosition(i)}
                    key={i}
                  >
                    {position}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Customizer;
