"use client";
import React, { useState } from "react";
import {useAppStore} from "../hooks/useAppStore"

const Customizer = () => {
  const {activePosition, doorPositions, setActivePosition} = useAppStore();
  
  return (
    <div className="fixed bottom-4 right-4 p-4 rounded-sm backdrop-blur-lg bg-transparent font-semibold border-[1px]">
      <h2>Customize your door</h2>
      <div className="">
        <div className="">Where is the door going to be placed?</div>
        <div className="flex gap-4 mt-4">
          {doorPositions.map((position, i) => {
            const clicked = activePosition === i ? true : false;
            return (
              <button
                className={`px-4 py-2 bg-[var(--color-pri)] rounded-sm border-[1px] hover:scale-[1.05] duration-[.3s] ${
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
  );
};

export default Customizer;
