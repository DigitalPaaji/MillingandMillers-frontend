"use client"
import React, { useEffect, useState } from 'react'
import { base_url, img_url } from '../components/urls';
import axios from 'axios';
import { FaArrowRight, FaDotCircle } from 'react-icons/fa';
import Link from 'next/link';

const page = () => {

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
    <div className="  container mx-auto my-9">
        
        <div >
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
        </div>
  )
}

export default page