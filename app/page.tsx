import Image from "next/image";
import Navbar from "./components/Navbar";
import Prototype from "./components/Prototype";
// import Customizer from "./components/Customizer";
import Samples from "./components/Samples";

export default function Home() {
  return (
    <div className="mt-20">
      <Navbar />
      <div className="main mt-[5rem] flex">
        <Prototype />
        <Samples />
        {/* <Customizer /> */}
      </div>
    </div>
  );
}
