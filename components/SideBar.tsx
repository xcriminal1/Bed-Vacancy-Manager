import React from "react";
import Image from "next/image";
import logomark from "../public/logomark.svg";
import Link from "next/link";

const SidePanel = () => {
  return (
    <div className="h-screen bg-[#2A1E42] text-white w-24 flex flex-col items-center">
      {/* Logo area */}
      <Link href="/" className="py-5 flex justify-center">
        <Image src={logomark} alt="Logo" width={38} height={38} />
      </Link>

      {/* Properties navigation item - active state */}
      <Link href="/" className="w-full flex flex-col items-center pt-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 6V10M14 14H10M14 18H10M14 8H10M18 12H20C20.5304 12 21.0391 12.2107 21.4142 12.5858C21.7893 12.9609 22 13.4696 22 14V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H6M18 22V4C18 3.46957 17.7893 2.96086 17.4142 2.58579C17.0391 2.21071 16.5304 2 16 2H8C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4V22"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        <span className="text-xs font-medium text-white mt-2">My Properties</span>
      </Link>

      {/* Empty space for additional nav items */}
      <div className="flex-grow"></div>
    </div>
  );
};

export default SidePanel;
