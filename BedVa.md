"use client";
// components/BedVacancy.tsx
import React, { useState } from "react";
import RoomDialog from "./RoomDialog";

const BedVacancy: React.FC = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleConfirm = (roomCount: number) => {
        console.log(`Room with ${roomCount} beds added`);
        setDialogOpen(false);
      };

  return (
    <div className="h-full w-full border border-gray-300 rounded-lg">
      {/* Header */}
      <div className="px-6 py-2 border-b border-gray-300 text-lg font-bold text-black">
        Beds Vacancy
      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center ml-4 hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Filters
          </button>
          </div>
          <div className="grid grid-cols-6 bg-gray-100 p-3 text-gray-600 justify-center font-medium">
          <div>ROOM NUMBER</div>
          <div>TOTAL BEDS</div>
          <div>OCCUPIED BEDS</div>
          <div>AVAILABLE BEDS</div>
          <div>OCCUPIED BED GENDER</div>
          <div>PRIVATE/SHARED</div>
        </div>

      {/* Empty state + Add Room */}
      <div className="flex flex-col items-center justify-center p-6 space-y-4">
        {/* Placeholder icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>

        <p className="text-gray-500">No clients here yet!</p>

        <button
          onClick={() => setDialogOpen(true)}
          className="px-4 py-2 bg-[#2A1E42] text-white rounded-md hover:bg-purple-950"
        >
          + Add Room
        </button>
      </div>
      <RoomDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirm}
        availableBeds={10}
      />
    </div>
  );
};

export default BedVacancy;
