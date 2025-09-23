"use client";
import Image from "next/image";
// import Customizer from "./components/Customizer";
// import Samples from "./samples/page";
import { useAppStore } from "./hooks/useAppStore";
import ModelDetails from "./samples/[slug]/page";
import Customizer from "./components/Customizer";

export default function Home() {
  const { activeModel } = useAppStore();
  return (
    <>
      <div className="vl mx-4 h-[80vh] w-[1px] bg-gray-300"></div>
      <Customizer />
      
      {/* {activeModel ? <ModelDetails /> : <Samples />} */}
    </>
  );
}
