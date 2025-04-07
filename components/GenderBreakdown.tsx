import React from "react";

interface GenderBreakdownProps {
  unoccupied: number;
  male: number;
  female: number;
  any: number;
}

const GenderBreakdown: React.FC<GenderBreakdownProps> = ({
  unoccupied,
  male,
  female,
  any,
}) => {
  return (
    <div className="h-full w-11.875rem border-1 border-gray-300 rounded-lg ml-[-6.25rem]">
      <div className="text-black text-lg font-bold px-6 py-2 border-b border-gray-300">
        Gender Breakdown of Unoccupied Beds
      </div>
      <div className="grid grid-cols-4 gap-2 h-full w-full p-8">
        <div className="flex flex-col items-start justify-center">
          <div className="text-black text-2xl font-bold">{unoccupied}</div>
          <div className="flex flex-row text-gray-400 text-sm text-center justify-center items-center gap-1">
            <div className="h-2 w-4 bg-red-300 rounded-2xl"></div>
            Unoccupied
          </div>
        </div>
        <div className="flex flex-col items-start justify-center">
          <div className="text-black text-2xl font-bold">{male}</div>
          <div className="flex flex-row text-gray-400 text-sm text-center justify-center items-center gap-1">
            <div className="h-2 w-4 bg-purple-300 rounded-2xl"></div>
            Male Beds
          </div>
        </div>
        <div className="flex flex-col items-start justify-center">
          <div className="text-black text-2xl font-bold">{female}</div>
          <div className="flex flex-row text-gray-400 text-sm text-center justify-center items-center gap-1">
            <div className="h-2 w-4 bg-fuchsia-300 rounded-2xl"></div>
            Female Beds
          </div>
        </div>
        <div className="flex flex-col items-start justify-center">
          <div className="text-black text-2xl font-bold">{any}</div>
          <div className="flex flex-row text-gray-400 text-sm text-center justify-center items-center gap-1">
            <div className="h-2 w-4 bg-lime-300 rounded-2xl"></div>
            Any
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderBreakdown;
