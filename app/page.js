import Image from "next/image";
import Herosection from "./components/Herosection";
import Topnews from "./components/Topnews";
import Add from "./components/Add";
import Events from "./components/Events";
import Biofuel from "./components/Biofuel";
import WheatSection from "./components/Wheats";
import Companies from "./components/Companies";
import Government_policies from "./components/Government_policies";

export default function Home() {
  return (
  <>
  <Herosection />
  <Topnews />
  <Add />
  <Events />
  <Add />
  <Biofuel />
  <Add />
  <WheatSection />
  <Add />
 <Companies />
  <Add />
<Government_policies />



  </>
  );
}
