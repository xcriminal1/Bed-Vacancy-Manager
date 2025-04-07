"use client";
import React, { useEffect, useState } from "react";
import RoomDialog from "./RoomDialog";

interface Room {
  id: number;
  totalBeds: number;
  occupiedBeds: number;
  gender: string;
  type: string;
}

const BedVacancy: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomIdCounter, setRoomIdCounter] = useState(1);

  // Load from localStorage
  useEffect(() => {
    const storedRooms = localStorage.getItem("roomData");
    try {
      if (storedRooms) {
        const parsed = JSON.parse(storedRooms);
        if (Array.isArray(parsed)) {
          setRooms(parsed);
          setRoomIdCounter(
            parsed.length
              ? Math.max(...parsed.map((r: Room) => r.id)) + 1
              : 1
          );
        }
      }
    } catch (err) {
      console.error("Failed to parse stored room data:", err);
      localStorage.removeItem("roomData"); // clear corrupted data
    }
  }, []);
  

  // Save to localStorage whenever rooms change
  useEffect(() => {
    localStorage.setItem("roomData", JSON.stringify(rooms));
  }, [rooms]);

  const handleConfirm = (roomCount: number) => {
    const newRooms: Room[] = Array.from({ length: roomCount }, (_, index) => ({
      id: roomIdCounter + index,
      totalBeds: 4,
      occupiedBeds: 2,
      gender: "Unassigned",
      type: "Shared",
    }));

    setRooms((prevRooms) => [...prevRooms, ...newRooms]);
    setRoomIdCounter((prevId) => prevId + roomCount);
    setDialogOpen(false);
  };

  const handleFieldChange = (roomId: number, field: keyof Room, value: string | number) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId ? { ...room, [field]: field === "occupiedBeds" || field === "totalBeds" ? Number(value) : value } : room
      )
    );
  };

  const handleDelete = (roomId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this room?");
    if (confirmDelete) {
      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
    }
  };

  return (
    <div className="h-full w-full border border-gray-300 rounded-lg flex flex-col overflow-hidden">
    {/* Header */}
    <div className="px-6 py-2 border-b border-gray-300 text-lg font-bold text-black flex justify-between items-center">
      <span>Beds Vacancy</span>
      <div className="flex gap-3 ml-auto">
        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filters
        </button>
  
        <button
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-200"
          onClick={() => setDialogOpen(true)}
        >
          + Add Room
        </button>
      </div>
    </div>

      {/* Table Header */}
      <div className="grid grid-cols-7 bg-gray-100 p-3 text-gray-600 font-medium items-center text-center px-3 py-2  text-sm gap-2">
        <div>ROOM NUMBER</div>
        <div>TOTAL BEDS</div>
        <div>OCCUPIED BEDS</div>
        <div>AVAILABLE BEDS</div>
        <div>OCCUPIED BED GENDER</div>
        <div>PRIVATE/SHARED</div>
        <div>ACTION</div>
      </div>

      {/* Room Data */}
      {rooms.length > 0 ? (
        <div className="overflow-y-auto flex-1">
        {rooms.map((room) => (
          <div key={room.id} className="grid grid-cols-7 items-center text-center text-zinc-950  border-b border-gray-300 px-3 py-2 text-sm gap-2">
            <div>{room.id}</div>
            <input
              type="number"
              className="p-1 px-4 py-2 border rounded text-center"
              value={room.totalBeds}
              onChange={(e) => handleFieldChange(room.id, "totalBeds", e.target.value)}
            />
            <input
              type="number"
              className="p-1 px-4 py-2 border rounded text-center"
              value={room.occupiedBeds}
              onChange={(e) => handleFieldChange(room.id, "occupiedBeds", e.target.value)}
            />
            <div>{room.totalBeds - room.occupiedBeds}</div>
            <select
              className="p-1 px-4 py-2 border rounded text-center"
              value={room.gender}
              onChange={(e) => handleFieldChange(room.id, "gender", e.target.value)}
              style={{
                backgroundColor:
                  room.gender === "Male"
                    ? "#DBEAFE" // Light blue
                    : room.gender === "Female"
                    ? "#FCE7F3" // Light pink
                    : room.gender === "Mixed"
                    ? "#FEF3C7" // Light yellow
                    : "#E5E7EB", // Light gray for Unassigned
              }}
            >
              <option>Unassigned</option>
              <option>Male</option>
              <option>Female</option>
              <option>Mixed</option>
            </select>
            <select
              className="p-1 px-4 py-2 rounded text-center "
              value={room.type}
              onChange={(e) => handleFieldChange(room.id, "type", e.target.value)}
              style={{ backgroundColor: room.type === "Private" ? "#fce7f3" : "#c7d2fe" }}
            >
              <option>Private</option>
              <option>Shared</option>
            </select>
            <button
              onClick={() => handleDelete(room.id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 space-y-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <p className="text-gray-500">No rooms added yet!</p>
          <button
            onClick={() => setDialogOpen(true)}
            className="px-4 py-2 bg-[#2A1E42] text-white rounded-md hover:bg-purple-950"
          >
            + Add Room
          </button>
        </div>
      )}

{/* Summary Footer */}
{rooms.length > 0 && (
  <div className="grid grid-cols-7 bg-purple-50 text-purple-800 font-semibold justify-center p-4 rounded-b-lg shadow-inner mt-2">

    <div>Total Rooms: {rooms.length}</div>
    <div>
      Total Beds:{" "}
      {rooms.reduce((acc, room) => acc + room.totalBeds, 0)}
    </div>
    <div>
      Occupied Beds:{" "}
      {rooms.reduce((acc, room) => acc + room.occupiedBeds, 0)}
    </div>
    <div>
      Available Beds:{" "}
      {rooms.reduce(
        (acc, room) => acc + (room.totalBeds - room.occupiedBeds),
        0
      )}
    </div>
    <div></div>
    <div></div>
    <div></div>
  </div>
)}


      {/* Dialog */}
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
