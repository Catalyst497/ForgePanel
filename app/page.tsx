import Image from "next/image";
import Navbar from "./components/Navbar";
import Prototype from "./components/Prototype";
import Customizer from "./components/Customizer";
import Samples from "./components/Samples";

export default function Home() {
  return (
    <div className="mt-20">
      <Navbar />
      <h1 className="text-center my-4">
        Customize Your Dream Door
      </h1>
      <div className="main mt-[5rem] flex">
        <Prototype />
        <Samples />
        <Customizer />
      </div>
    </div>
  );
}
