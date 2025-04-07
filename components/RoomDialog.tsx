"use client";

import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (roomCount: number) => void;
  availableBeds: number; // optional use; not really needed in this case
}

const RoomDialog: React.FC<Props> = ({ isOpen, onClose, onConfirm }) => {
  const [selectedRoom, setSelectedRoom] = useState<number>(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-black">Add Room(s)</h3>
        </div>

        <label className="text-sm font-medium text-gray-600 mb-1 block">Select number of rooms to add:</label>
        <select
          className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(Number(e.target.value))}
        >
          {[...Array(10).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="w-1/2 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-center font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(selectedRoom)}
            className="w-1/2 py-3 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-950"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDialog;
