import React, { useState, useRef, useEffect } from "react";

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: {
    gender: string;
    minAvailableBeds?: number;
  }) => void;
  anchorRef: React.RefObject<HTMLButtonElement>;
}

const FilterDialog: React.FC<FilterDialogProps> = ({ isOpen, onClose, onApply, anchorRef }) => {
  const [availableBeds, setAvailableBeds] = useState("");
  const [gender, setGender] = useState("");
  const [isAvailableDropdownOpen, setIsAvailableDropdownOpen] = useState(false);
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node) &&
      anchorRef.current &&
      !anchorRef.current.contains(e.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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
    <div
      ref={dropdownRef}
      className="absolute bg-white shadow-lg border border-gray-300 rounded-lg w-64 p-4 z-50"
      style={{
        top: anchorRef.current?.getBoundingClientRect().bottom! + window.scrollY + 8,
        left: anchorRef.current?.getBoundingClientRect().left! + window.scrollX,
      }}
    >
      <h2 className="text-md font-semibold text-gray-700 mb-4">Filters</h2>

      {/* Beds */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm text-gray-700 font-medium">Beds</label>
          <button onClick={handleResetBeds} className="text-purple-900 text-xs hover:underline">
            Reset
          </button>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsAvailableDropdownOpen(!isAvailableDropdownOpen)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-slate-500 text-left flex justify-between"
          >
            {availableBeds || "Available Beds"} <span>▼</span>
          </button>
          {isAvailableDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded text-slate-500 shadow-sm">
              {["0", "1", "2", "3+"].map((val) => (
                <div
                  key={val}
                  onClick={() => {
                    setAvailableBeds(val);
                    setIsAvailableDropdownOpen(false);
                  }}
                  className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  {val}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Gender */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm text-gray-700 font-medium">Gender</label>
          <button onClick={handleResetGender} className="text-purple-900 text-xs hover:underline">
            Reset
          </button>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsGenderDropdownOpen(!isGenderDropdownOpen)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-slate-500 text-left flex justify-between"
          >
            {gender || "Gender"} <span>▼</span>
          </button>
          {isGenderDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded text-slate-500 shadow-sm">
              {["Male", "Female"].map((val) => (
                <div
                  key={val}
                  onClick={() => {
                    setGender(val);
                    setIsGenderDropdownOpen(false);
                  }}
                  className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
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
        <button onClick={handleResetAll} className="text-gray-600 text-sm">
          Reset All
        </button>
        <button
          onClick={handleApply}
          className="bg-indigo-900 text-white text-sm px-4 py-1.5 rounded hover:bg-indigo-800"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterDialog;
