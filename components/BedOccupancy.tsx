import React from "react";
import DonutChart from "./DonutChart";

const BedOccupancy = () => {
  return (
    <div className="h-full w-full border-1 border-gray-300 rounded-lg">
      <div className="text-black text-xl font-bold px-6 py-2 border-b border-gray-300">
        Total Bed Occupancy
      </div>
      <div className="grid grid-cols-3 gap-2 h-full w-full">
        {/* Text section */}
        <div className="grid grid-row-2 col-span-1 gap-2 h-full w-full justify-center items-center">
          <StatText text="Occupied" value={0} />
          <StatText text="Unoccupied" value={0} />
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

export const StatText = (props: any) => {
    return(
        <div className="grid grid-row-2 items-center justify-start w-full h-full gap-2">
            <div className="flex justify-start items-center text-black text-2xl w-full h-full gap-2">
              <div className={ "w-1 h-4 rounded-lg" +(props.text === "Occupied" ? " bg-green-200" : " bg-red-300")}></div>
              <div className="text-gray-400 text-lg text-center">
                {props.text} Beds
              </div>
            </div>
              <div className="flex justify-start items-center text-black text-2xl w-full h-full gap-2">
                <span className="font-extrabold text-3xl px-1">{props.value}</span> Beds
              </div>
          </div>
    );
}
// // /* Donut Chart */

// /* Vector 965 */

// width: 0px;
// height: 8px;

// /* BestFit/Occupied */
// border: 4px solid #91F2CD;

// /* Inside auto layout */
// flex: none;
// order: 0;
// flex-grow: 0;
