"use client";

import React, { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Model as Door } from "../assets/3dmodel/Door";
import { SlidingDoor } from "../assets/3dmodel/SlidingDoor";
import { NewDoor } from "../assets/3dmodel/NewDoor";
import { OrbitControls, Environment } from "@react-three/drei";
import { useAppStore } from "../hooks/useAppStore";
import CustomLoader from "./CustomLoader";

const Prototype = () => {
  const [open, setOpen] = useState(false);
  const { activeModel } = useAppStore();
  useMemo(() => {
    console.log(activeModel);
  }, [activeModel]);
  return (
    <div className="w-[40%]">
      <div className="">
        <figure
          className="-translate-x-[10%]"
          style={{ width: "100%", height: "100vh" }}
        >
          {true == true && (
            <Canvas>
              {/* <Environment preset="city" /> */}
              <ambientLight intensity={1} />
              <directionalLight position={[5, 5, 5]} intensity={2} />
              <pointLight position={[-5, 5, 5]} intensity={2} />
              <Suspense fallback={<CustomLoader />}>
                <NewDoor />
              </Suspense>
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
              />
            </Canvas>
          )}

          {/* <Canvas>
            <Environment preset="sunset" />
            <Suspense fallback={null}>
              <Door open={open} setOpen={setOpen} />
            </Suspense>
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
              target={[-1, 0, 0]}
            />
          </Canvas> */}
        </figure>
      </div>
    </div>
  );
};

export default Prototype;
