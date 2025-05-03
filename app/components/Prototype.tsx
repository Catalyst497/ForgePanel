"use client";

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Model as Door } from "../assets/3dmodel/Door";
import { OrbitControls, Environment } from "@react-three/drei";

const Prototype = () => {
  const [openAngle, setOpenAngle] = useState(0);
  return (
    <div>
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas>
          <Environment preset="sunset" />
          <Suspense fallback={null}>
            <Door openAngle={openAngle} />
          </Suspense>
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
        <button
          className="bg-green-400 text-white px-4 py-2"
          onClick={() => setOpenAngle(Math.PI / 2)}
        >
          Open Door
        </button>
      </figure>
    </div>
  );
};

export default Prototype;
