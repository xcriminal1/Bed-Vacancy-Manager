"use client";

import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (roomCount: number) => void;
  availableBeds: number;
}

const AddRoomDialog: React.FC<Props> = ({ isOpen, onClose, onConfirm, availableBeds }) => {
  const [selectedRoom, setSelectedRoom] = useState<number>(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Room</h2>
          <p className="text-sm text-gray-500">Available Beds: {availableBeds}</p>
        </div>

        <label className="text-sm font-medium text-gray-600 mb-1 block">Add Room</label>
        <select
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(Number(e.target.value))}
        >
          {[...Array(availableBeds).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(selectedRoom)}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-950"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomDialog;
