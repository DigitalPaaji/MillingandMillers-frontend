"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaDotCircle } from 'react-icons/fa';
import { FaArrowRight, FaFilePdf, FaLandmark } from 'react-icons/fa6';
import { base_url, img_url } from './urls';
import Link from 'next/link';

const GovernmentPolicies = () => {
  const [notifications,setNotifications] = useState([ ]);

  const fetchGovt= async()=>{
    try {
      const response = await axios.get(`${base_url}/govt/get`);
      const data = await response.data;
      if(data.success){
setNotifications(data.data)
      }
    } catch (error) {
      setNotifications([ ])
    }
  }
  
useEffect(()=>{fetchGovt()},[ ])
  return (
    <div className="container px-4 mx-auto my-10">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
        <div className="flex items-center gap-3">
          <div className="bg-[#FF3F5A] p-2 rounded-lg text-white">
            <FaLandmark size={20} />
          </div>
          <h2 className='text-2xl font-bold text-gray-800'>Government Policies/ Notifications</h2>
        </div>
         <Link  href={"/govt-policies"} className="hidden sm:flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#FF3F5A] transition-colors">
        
              View More <FaArrowRight size={12} />
                </Link>
      </div>

      {/* The "Feed" Container */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        
        {/* Scrollable Area */}
        <div className="h-[500px] overflow-y-auto custom-scrollbar p-2">
          <ul className="divide-y divide-gray-100">
            {notifications.length > 0 && notifications.map((item, index) => (
              <li key={index} className="group p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer rounded-lg">
                <div className="flex items-start gap-4">
                  
                  {/* Icon/Bullet */}
                  <div className="mt-1 min-w-[30px] flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-red-50 text-[#FF3F5A] flex items-center justify-center group-hover:bg-[#FF3F5A] group-hover:text-white transition-colors">
                      <FaDotCircle  size={14} />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    {/* Badge for recent items */}
                    {index < 3 && (
                      <span className="inline-block px-2 py-0.5 mb-2 text-[10px] font-bold text-green-700 bg-green-100 rounded-full uppercase tracking-wider">
                        New
                      </span>
                    )}
                    <p className="text-sm text-gray-700 font-medium leading-relaxed group-hover:text-gray-900">
                      {item.des}
                    </p>
                    <Link href={`${img_url}${item.pdf}`} target='_blank' className="mt-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-bold text-[#FF3F5A] flex items-center gap-1">
                        Read Notification <FaArrowRight size={10} />
                      </span>
                    </Link>
                  </div>

                </div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Footer Fade effect to indicate scrolling */}
        <div className="bg-gray-50 p-2 text-center border-t border-gray-100 text-xs text-gray-500 font-medium">
          Scroll to view more updates
        </div>
      </div>

      {/* CSS for Custom Scrollbar (Optional) */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ccc; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #FF3F5A; 
        }
      `}</style>
    </div>
  );
};

export default GovernmentPolicies;