import React from 'react'
import { FaInfoCircle, FaTimes } from "react-icons/fa"; // Optional icons for realism

const Add = () => {
  return (
    <div className='container px-4 mx-auto my-8'>
      
      {/* Ad Slot Container */}
      <div className='flex flex-col items-center w-full'>
        
        {/* "Advertisement" Label - Standard Google Style */}
        <span className='text-[10px] text-gray-400 uppercase tracking-widest mb-1'>
          Advertisement
        </span>

        {/* The Ad Wrapper (Simulates the AdSense Slot) */}
        <div className='relative group bg-gray-50 border border-gray-200 p-[1px] shadow-sm max-w-[728px] w-full flex justify-center items-center'>
          
          {/* Fake "AdChoices" / Close UI (Top Right) */}
          <div className='absolute top-0 right-0 flex'>
      <div className='bg-red-600/90 text-white  p-1 text-[8px] md:text-[10px] relative overflow-hidden '>Ad
 <p className='h-6 bg-[#D9DBDA] w-full absolute rotate-45 -bottom-[21px] -left-[1.6px] md:left-0 '></p>

      </div>

      
           
          </div>

          {/* The Actual Banner */}
          <img 
            src='banner1.jpg' 
            alt='Sponsored Content'
            className='w-full h-auto object-cover max-h-[90px] md:max-h-[200px]' 
          />
          
        </div>

      </div>
    </div>
  )
}

export default Add