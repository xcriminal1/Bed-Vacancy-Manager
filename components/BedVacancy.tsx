import { useMemo, useState } from 'react';

const initialRoomData = [
  { roomNumber: '101', totalBeds: 1, occupiedBeds: 1, gender: 'Female', type: 'Private' },
  { roomNumber: '102', totalBeds: 1, occupiedBeds: 0, gender: 'Female', type: 'Private' },
  { roomNumber: '103', totalBeds: 1, occupiedBeds: 0, gender: 'Male', type: 'Private' },
  { roomNumber: '104', totalBeds: 1, occupiedBeds: 1, gender: 'Male', type: 'Private' },
  { roomNumber: '105', totalBeds: 1, occupiedBeds: 1, gender: 'Male', type: 'Private' },
  { roomNumber: '106', totalBeds: 6, occupiedBeds: 4, gender: 'Female', type: 'Shared' },
  { roomNumber: '107', totalBeds: 5, occupiedBeds: 3, gender: 'Female', type: 'Shared' },
  { roomNumber: '108', totalBeds: 7, occupiedBeds: 4, gender: 'Female', type: 'Shared' },
  { roomNumber: '109', totalBeds: 3, occupiedBeds: 2, gender: 'Male', type: 'Shared' },
  { roomNumber: '110', totalBeds: 4, occupiedBeds: 2, gender: 'Female', type: 'Shared' }
];

const BedVacancy = () => {
  const [rooms, setRooms] = useState(initialRoomData);

  const handleChange = (index, field, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[index][field] = field === 'totalBeds' || field === 'occupiedBeds' ? parseInt(value) : value;
    setRooms(updatedRooms);
  };

  const totals = useMemo(() => {
    return rooms.reduce((acc, room) => {
      acc.totalBeds += room.totalBeds;
      acc.occupiedBeds += room.occupiedBeds;
      return acc;
    }, { totalBeds: 0, occupiedBeds: 0 });
  }, [rooms]);

  const availableBeds = totals.totalBeds - totals.occupiedBeds;
  const occupiedAngle = (totals.occupiedBeds / totals.totalBeds) * 180;

  return (
    <div className="p-6 space-y-6">

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Room Number</th>
              <th className="px-4 py-2">Total Beds</th>
              <th className="px-4 py-2">Occupied Beds</th>
              <th className="px-4 py-2">Available Beds</th>
              <th className="px-4 py-2">Occupied Bed Gender</th>
              <th className="px-4 py-2">Private/Shared</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => {
              const available = room.totalBeds - room.occupiedBeds;
              return (
                <tr key={room.roomNumber} className="border-t">
                  <td className="px-4 py-2">{room.roomNumber}</td>
                  <td className="px-4 py-2">
                    <input type="number" className="w-16 border rounded p-1" value={room.totalBeds} min={0}
                      onChange={(e) => handleChange(index, 'totalBeds', e.target.value)} />
                  </td>
                  <td className="px-4 py-2">
                    <input type="number" className="w-16 border rounded p-1" value={room.occupiedBeds} min={0} max={room.totalBeds}
                      onChange={(e) => handleChange(index, 'occupiedBeds', e.target.value)} />
                  </td>
                  <td className="px-4 py-2 text-center">{available}</td>
                  <td className="px-4 py-2">
                    <select className="border rounded p-1" value={room.gender}
                      onChange={(e) => handleChange(index, 'gender', e.target.value)}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <select className="border rounded p-1" value={room.type}
                      onChange={(e) => handleChange(index, 'type', e.target.value)}>
                      <option value="Private">Private</option>
                      <option value="Shared">Shared</option>
                    </select>
                  </td>
                </tr>
              );
            })}
            <tr className="bg-gray-100 font-bold">
              <td className="px-4 py-2">Total</td>
              <td className="px-4 py-2">{totals.totalBeds}</td>
              <td className="px-4 py-2">{totals.occupiedBeds}</td>
              <td className="px-4 py-2">{availableBeds}</td>
              <td className="px-4 py-2"></td>
              <td className="px-4 py-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicBedChart;
