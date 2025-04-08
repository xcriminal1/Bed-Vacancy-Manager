import React, { useState } from "react";

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: {
    gender: string;
    minAvailableBeds?: number;
  }) => void;
}

const FilterDialog: React.FC<FilterDialogProps> = ({ isOpen, onClose, onApply }) => {
  const [availableBeds, setAvailableBeds] = useState("");
  const [gender, setGender] = useState("");
  const [isAvailableDropdownOpen, setIsAvailableDropdownOpen] = useState(false);
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);

  const handleResetBeds = () => setAvailableBeds("");
  const handleResetGender = () => setGender("");
  const handleResetAll = () => {
    setAvailableBeds("");
    setGender("");
  };

  const handleApply = () => {
    const minAvailableBeds = availableBeds === ""
      ? undefined
      : availableBeds === "3+"
        ? 3
        : parseInt(availableBeds);
    onApply({ gender, minAvailableBeds });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 text-lg"
        >
          ✕
        </button>

        <h2 className="text-lg font-medium text-gray-700 mb-4">Filters</h2>

        {/* Beds Filter */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-gray-700 font-medium">Beds</label>
            <button onClick={handleResetBeds} className="text-blue-600 text-sm hover:text-blue-800">
              Reset
            </button>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsAvailableDropdownOpen(!isAvailableDropdownOpen)}
              className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-md"
            >
              <span className="text-gray-700">{availableBeds || "Available Beds"}</span>
              <span className="text-gray-500">▼</span>
            </button>
            {isAvailableDropdownOpen && (
              <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {["0", "1", "2", "3+"].map((val) => (
                  <div
                    key={val}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setAvailableBeds(val);
                      setIsAvailableDropdownOpen(false);
                    }}
                  >
                    {val}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Gender Filter */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-gray-700 font-medium">Gender</label>
            <button onClick={handleResetGender} className="text-blue-600 text-sm hover:text-blue-800">
              Reset
            </button>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsGenderDropdownOpen(!isGenderDropdownOpen)}
              className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-md"
            >
              <span className="text-gray-700">{gender || "Gender"}</span>
              <span className="text-gray-500">▼</span>
            </button>
            {isGenderDropdownOpen && (
              <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {["Male", "Female"].map((val) => (
                  <div
                    key={val}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setGender(val);
                      setIsGenderDropdownOpen(false);
                    }}
                  >
                    {val}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleResetAll}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Reset All
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-2 bg-indigo-900 text-white rounded-md hover:bg-indigo-800"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDialog;
