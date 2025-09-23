"use client";
import React, { useState } from "react";
import { useAppStore } from "../hooks/useAppStore";
import { useRouter } from "next/navigation";

const Customizer = () => {
  const router = useRouter();
  const { activePosition, doorPositions, setActivePosition } = useAppStore();
  const handleClick = (i: number) => {
    setActivePosition(i)
    router.push("/samples");
  }
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
                    className={`px-4 py-2 rounded-sm border-[1px] hover:scale-[1.05] duration-[.3s]`}
                    type="button"
                    onClick={() => handleClick(i)}
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
