"use client";

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Model as Door } from "../assets/3dmodel/Door";
import { OrbitControls, Environment } from "@react-three/drei";

const Prototype = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-[40%]">
      <div className="">
        <figure
          className="-translate-x-[10%]"
          style={{ width: "100%", height: "100vh" }}
        >
          <Canvas>
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
          </Canvas>
        </figure>
      </div>
    </div>
  );
};

export default Prototype;
