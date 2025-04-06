import Image from "next/image";
import SidePanel from "@/components/SideBar";
import Topbar from "@/components/Topbar";
import BedOccupancy from "@/components/BedOccupancy";

export default function Home() {
  return (
    <>
      <div className="flex flex-row">
        <SidePanel />
        <div className="flex flex-col w-full h-screen bg-white">
          <Topbar />
          <div className="flex flex-col w-full h-full bg-white p-6">
            <BedOccupancy />
          </div>  
        </div>
      </div>
    </>
  );
}
