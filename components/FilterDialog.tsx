import React, { useState } from "react";

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: {
    gender?: string;
    type?: string;
    minAvailableBeds?: number;
  }) => void;
}

const FilterDialog: React.FC<FilterDialogProps> = ({ isOpen, onClose, onApply }) => {
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [minAvailableBeds, setMinAvailableBeds] = useState<number | undefined>();

  const handleApply = () => {
    onApply({ gender, type, minAvailableBeds });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">Filter Rooms</h2>

        <div>
          <label className="block text-sm font-medium">Gender</label>
          <select
            className="w-full border px-3 py-2 rounded mt-1"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Any</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Mixed">Mixed</option>
            <option value="Unassigned">Unassigned</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Room Type</label>
          <select
            className="w-full border px-3 py-2 rounded mt-1"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Any</option>
            <option value="Private">Private</option>
            <option value="Shared">Shared</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Minimum Available Beds</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded mt-1"
            value={minAvailableBeds ?? ""}
            onChange={(e) =>
              setMinAvailableBeds(e.target.value ? parseInt(e.target.value) : undefined)
            }
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDialog;
