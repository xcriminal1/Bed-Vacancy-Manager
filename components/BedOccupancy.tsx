import React from "react";
import DonutChart from "./DonutChart";

interface BedOccupancyProps {
  occupied: number;
  unoccupied: number;
}


const BedOccupancy: React.FC<BedOccupancyProps> = ({ occupied, unoccupied }) => {
  return (
    <div className="h-full w-140 border-1 border-gray-300 rounded-lg">
      <div className="text-black text-lg font-bold px-6 py-2 border-b border-gray-300">
        Total Bed Occupancy
      </div>
      <div className="grid grid-cols-3 gap-2 p-2 w-full">
        {/* Text section */}
        <div className="grid grid-rows-2 col-span-1 w-full justify-center items-center gap-1.5">
          <StatText text="Occupied" value={occupied} />
          <StatText text="Unoccupied" value={unoccupied} />
        </div>

        {/* Semi Donut Chart */}
        <div className="col-span-2 h-full w-full justify-center items-center">
          <DonutChart />
        </div>
      </div>
    </div>
  );
};

export default BedOccupancy;

export const StatText = ({ text, value }: { text: string; value: number }) => {
  return (
    <div className="grid grid-rows-2 items-center justify-start w-full">
      <div className="flex justify-start items-center text-black text-xl w-full gap-1">
        <div
          className={
            "w-1 h-4 rounded-lg" +
            (text === "Occupied" ? " bg-green-200" : " bg-red-300")
          }
        ></div>
        <div className="text-gray-400 text-md text-center">{text} Beds</div>
      </div>
      <div className="flex justify-start items-center text-black text-xl w-full gap-1">
        <span className="font-extrabold text-2xl px-1">{value}</span> Beds
      </div>
    </div>
  );
};
