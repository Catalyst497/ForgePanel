import Image from "next/image";
import Navbar from './components/Navbar'
import Prototype from "./components/Prototype";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Prototype />
    </div>
  );
}
