"use client";
import BedOccupancy from "@/components/BedOccupancy";
import BedVacancy from "@/components/BedVacancy";
import GenderBreakdown from "@/components/GenderBreakdown";
import SidePanel from "@/components/SideBar";
import Topbar from "@/components/Topbar";
import { useEffect, useState } from "react";

export interface Room {
  id: number;
  totalBeds: number;
  occupiedBeds: number;
  gender: string;
  type: string;
}

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomIdCounter, setRoomIdCounter] = useState(1);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const storedRooms = localStorage.getItem("roomData");
    try {
      if (storedRooms) {
        const parsed = JSON.parse(storedRooms);
        if (Array.isArray(parsed)) {
          setRooms(parsed);
          setRoomIdCounter(parsed.length ? Math.max(...parsed.map((r: Room) => r.id)) + 1 : 1);
        }
      }
    } catch (err) {
      console.error("Failed to parse stored room data:", err);
      localStorage.removeItem("roomData");
    }
  }, []);

  useEffect(() => {
    if (hasMounted) {
    localStorage.setItem("roomData", JSON.stringify(rooms));
    }
  }, [rooms, hasMounted]);

  if (!hasMounted) return null;

  const handleUpdateRooms = (updatedRooms: Room[]) => {
    setRooms(updatedRooms);
  };

  // Calculate gender-based unoccupied beds
  const genderStats = rooms.reduce(
    (acc, room) => {
      const available = room.totalBeds - room.occupiedBeds;
      if (available > 0) {
        switch (room.gender) {
          case "Male":
            acc.male += available;
            break;
          case "Female":
            acc.female += available;
            break;
          case "Mixed":
          case "Unassigned":
          default:
            acc.any += available;
            break;
        }
        acc.unoccupied += available;
      }
      return acc;
    },
    { unoccupied: 0, male: 0, female: 0, any: 0 }
  );

  const bedStats = rooms.reduce(
    (acc, room) => {
      acc.total += room.totalBeds;
      acc.occupied += room.occupiedBeds;
      return acc;
    },
    { total: 0, occupied: 0 }
  );
  
  bedStats.unoccupied = bedStats.total - bedStats.occupied;
  

  return (
    <div className="flex flex-row">
      <SidePanel />
      <div className="flex flex-col w-full h-screen bg-white">
        <Topbar />
        <div className="grid grid-cols-2 w-full h-30% bg-white p-6 gap-2">
        <BedOccupancy
          total={bedStats.total}
          occupied={bedStats.occupied}
          unoccupied={bedStats.unoccupied}
          />
          <GenderBreakdown
            unoccupied={genderStats.unoccupied}
            male={genderStats.male}
            female={genderStats.female}
            any={genderStats.any}
          />
          <div className="col-span-2 h-[500px]">
            <BedVacancy
              rooms={rooms}
              onUpdateRooms={handleUpdateRooms}
              roomIdCounter={roomIdCounter}
              setRoomIdCounter={setRoomIdCounter}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
