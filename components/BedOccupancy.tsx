import React from 'react'

const BedOccupancy = () => {
  return (
    <div className='h-full w-full border-1 border-gray-300 rounded-lg'>
      <div className='text-black text-xl font-bold px-6 py-2 border-b border-gray-300'>
        Total Bed Occupancy
      </div>
      <div className='grid grid-rows-3 gap-2'>
        <div className='grid grid-cols-2 gap-2'>
          <div className='bg-red-400 w-full h-full'>
            <div className='text-gray-400 text-center'>
                Occupied Beds
            </div>
          </div>
          <div className='bg-blue-500 rounded-lg w-full h-full'></div>
          </div>
      </div>
    </div>
  )
}

export default BedOccupancy
// // /* Donut Chart */

// /* Vector 965 */

// width: 0px;
// height: 8px;

// /* BestFit/Occupied */
// border: 4px solid #91F2CD;

// /* Inside auto layout */
// flex: none;
// order: 0;
// flex-grow: 0;

