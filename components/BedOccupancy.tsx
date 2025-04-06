import React from "react";
import DonutChart from "./DonutChart";

const BedOccupancy = () => {
  return (
    <div className="h-full w-140 border-1 border-gray-300 rounded-lg">
      <div className="text-black text-lg font-bold px-6 py-2 border-b border-gray-300">
        Total Bed Occupancy
      </div>
      <div className="grid grid-cols-3 gap-2 p-2 w-full">
        {/* Text section */}
        <div className="grid grid-row-2 col-span-1 w-full justify-center items-center gap-1.5">
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
        <div className="grid grid-row-2 items-center justify-start w-full">
            <div className="flex justify-start items-center text-black text-xl w-full gap-1">
              <div className={ "w-1 h-4 rounded-lg" +(props.text === "Occupied" ? " bg-green-200" : " bg-red-300")}></div>
              <div className="text-gray-400 text-md text-center">
                {props.text} Beds
              </div>
            </div>
              <div className="flex justify-start items-center text-black text-xl w-full gap-1">
                <span className="font-extrabold text-2xl px-1">{props.value}</span> Beds
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
