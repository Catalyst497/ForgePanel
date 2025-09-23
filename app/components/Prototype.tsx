"use client";

import React, { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Model as Door } from "../assets/3dmodel/Door";
import { DoubleGlass } from "../assets/3dmodel/DoubleGlass";
import { SlidingDoor } from "../assets/3dmodel/SlidingDoor";
import { NewDoor } from "../assets/3dmodel/NewDoor";
import { FireEscapeDoor } from "../assets/3dmodel/FireEscapeDoor";
import { SimpleDoubleDoor } from "../assets/3dmodel/SimpleDoubleDoor";
import { MetalDoubleDoor } from "../assets/3dmodel/MetalDoubleDoor";
import { OrbitControls, Environment } from "@react-three/drei";
import { useAppStore } from "../hooks/useAppStore";
import { useProgress, Html } from "@react-three/drei";

const Prototype = () => {
  const [open, setOpen] = useState(false);
  const { activeModel } = useAppStore();
  const { progress } = useProgress();

  return (
    <div className="w-[50%]">
      <div className="">
        <figure
          className={`${
            activeModel === "new-door" ? "-translate-x-[10%]" : ""
          } `}
          style={{ width: "100%", height: "100vh" }}
        >
          {activeModel !== null ? (
            <Canvas>
              {/* <Environment preset="city" /> */}
              <ambientLight intensity={1} />
              <directionalLight position={[5, 5, 5]} intensity={2} />
              <pointLight position={[-5, 5, 5]} intensity={2} />
              <Suspense
                fallback={
                  <Html center>
                    <div style={{ color: "white" }}>
                      <progress value={progress.toFixed(0)} max={"100"} />
                    </div>
                  </Html>
                }
              >
                {activeModel === "wood swing door" && <NewDoor />}
                {activeModel.includes("pvc double door") && (
                  <SimpleDoubleDoor
                    key={"double-pvc"}
                    scale={1.5}
                    isWood={false}
                    position={[0, -0.5, 0]}
                  />
                )}

                {activeModel.includes("wood double door") && (
                  <SimpleDoubleDoor
                    key={"double-wood"}
                    scale={1.5}
                    isWood={true}
                    position={[0, -0.5, 0]}
                  />
                )}
                {activeModel.includes("glass double door") && (
                  <DoubleGlass position={[0, -2, 0]} />
                )}
                {activeModel === "metal double door 4" && (
                  <FireEscapeDoor
                    rotation={[0, 1.5, 0]}
                    scale={2.5}
                    position={[0, -2, 0]}
                  />
                )}
                {activeModel === "metal double door 2" && <MetalDoubleDoor />}
                {activeModel.includes("sliding glass door") && (
                  <SlidingDoor scale={1.5} />
                )}
              </Suspense>
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
              />
            </Canvas>
          ) : (
            <div className="text-center">
              Select a door and it will appear in 3D here.
            </div>
          )}
        </figure>
      </div>
    </div>
  );
};

export default Prototype;
