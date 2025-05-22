"use client"
import React from "react";
import { useProgress, Html } from "@react-three/drei";

const CustomLoader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: "white" }}>
        <progress value={progress.toFixed(0)} max={"100"}/>
      </div>
    </Html>
  );
};

export default CustomLoader;
