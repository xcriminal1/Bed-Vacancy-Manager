import React from "react";

const describeArc = (
  startAngle: number,
  endAngle: number,
  radius = 80,
  cx = 100,
  cy = 100
) => {
  const polarToCartesian = (angle: number) => {
    const rad = ((angle - 180) * Math.PI) / 180.0;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  };

  const start = polarToCartesian(endAngle);
  const end = polarToCartesian(startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
};

const DonutChart = (props: any) => {
  const beds = {
    totalBeds: 10,
    occupiedBeds: 3,
  };

  const occupiedAngle = (beds.occupiedBeds / beds.totalBeds) * 180;

  return (

      <div className="flex flex-col items-center bg-white p-4 w-full">
        <svg width="200" height="100" viewBox="0 0 200 100">
          <path
            d={describeArc(0, occupiedAngle)}
            fill="none"
            stroke="#27C49F"
            strokeWidth="15"
          />
          <path
            d={describeArc(occupiedAngle, 180)}
            fill="none"
            stroke="#F75D5D"
            strokeWidth="15"
          />
        </svg>
        <div className="text-center -mt-12">
          <p className="text-xl text-black text-bold">
            {beds.totalBeds}
          </p>
          <p className="text-sm text-gray-400">Beds Allowed</p>
        </div>
      </div>
  );
};
export default DonutChart;
