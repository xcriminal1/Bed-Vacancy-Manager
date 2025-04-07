import Image from "next/image";
import SidePanel from "@/components/SideBar";
import Topbar from "@/components/Topbar";
import BedOccupancy from "@/components/BedOccupancy";
import GenderBreakdown from "@/components/GenderBreakdown";
import BedVacancy from "@/components/BedVacancy";

export default function Home() {
  return (
    <>
      <div className="flex flex-row">
        <SidePanel />
        <div className="flex flex-col w-full h-screen bg-white">
          <Topbar />
          <div className="grid grid-cols-2 w-full h-30% bg-white p-6 gap-2">
            <BedOccupancy />
            <GenderBreakdown />
            <div className="grid1 w-4/2 h- bg-white p-2">
            <BedVacancy />
            </div>
          </div>  
        </div>
      </div>
    </>
  );
}
