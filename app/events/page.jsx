"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaTicketAlt, FaChevronRight, FaArchive, FaNewspaper } from "react-icons/fa";
import { base_url } from '../components/urls';
import Link from 'next/link';

const EventsPage = () => {
  
  // --- DATA ---
  const events = [
    {
      id: 1,
      day: "15",
      month: "JAN",
      year: "2026",
      title: "International Rice Milling Expo 2026",
      location: "Pragati Maidan, New Delhi",
      time: "10:00 AM - 05:00 PM",
      desc: "India's largest gathering of rice millers and machinery manufacturers. Featuring latest sorting technology.",
      category: "Expo"
    },
    {
      id: 2,
      day: "22",
      month: "FEB",
      year: "2026",
      title: "Sustainable Grain Tech Summit",
      location: "Jio World Centre, Mumbai",
      time: "09:00 AM - 04:00 PM",
      desc: "A focused conference on energy-efficient milling and sustainable packaging solutions.",
      category: "Conference"
    },
    {
      id: 3,
      day: "10",
      month: "MAR",
      year: "2026",
      title: "Global Wheat Flour Millers Meet",
      location: "Hyatt Regency, Chandigarh",
      time: "11:00 AM - 06:00 PM",
      desc: "Networking event for wheat flour millers to discuss government policies and export opportunities.",
      category: "Networking"
    }
  ];

  const recentPosts = [
    "Haryana: Rice millers’ defy delivery rules, no action on officials",
    "Punjab: PAU issues advisory for yellow rust in wheat",
    "Flour millers protest Sindh’s (Pakistan) wheat policy, allege subsidy favouring traders",
    "Green waste’s fiery exit in Ludhiana (Punjab): Rs 4 crore revised tender for problem’s biofuel fix.",
    "Time For New Delhi To Choke Dhaka? Bangladesh Turns To India For Rice, But Exporters Urge GoI To Halt Supplies"
  ];

  const archives = [
    "December 2025", "November 2025", "October 2025", "September 2025", 
    "August 2025", "July 2025", "June 2025", "May 2025", "April 2025", 
    "March 2025", "February 2025", "January 2025", "December 2024", 
    "November 2024", "October 2024", "September 2024", "August 2024", 
    "July 2024", "June 2024", "May 2024", "April 2024", "March 2024"
  ];


  const [event,setEvent]=useState([ ])


 const fetchEvent = async()=>{
  try {
    const response = await axios.get(`${base_url}/events/get`);
    const data = await response.data;
    if(data.success){
setEvent(data.data)
    }
  } catch (error) {
    setEvent([ ])
  }
 }


useEffect(()=>{fetchEvent()},[])
  return (
    <div className="bg-gray-50 min-h-screen font-sans">



      <div className="bg-[#222] text-white py-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#FF3F5A] opacity-5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">Upcoming Events</h1>
        <p className="text-gray-400 max-w-2xl mx-auto px-4 relative z-10">
          Join the leading industry experts at these upcoming expos, conferences, and networking meets.
        </p>
      </div>

      
      <div className="container mx-auto px-4 py-12 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          <div className="lg:col-span-3 flex flex-col gap-6">
           {event.length > 0 && event.map((event) => (
     <div 
      key={event._id} 
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 p-3 flex flex-col sm:flex-row gap-3 sm:items-center"
  >
    <div className="flex-shrink-0 w-full sm:w-16 h-14 bg-gray-50 rounded-md border border-gray-200 flex flex-col items-center justify-center group-hover:bg-[#FF3F5A] group-hover:border-[#FF3F5A] transition-colors">
      <span className="text-[10px] font-bold text-[#FF3F5A] uppercase group-hover:text-white">   {new Date(event.event_date).getFullYear()}</span>
     
      <span className="text-lg font-bold text-gray-800 leading-none group-hover:text-white">{new Date(event.event_date).getDate()}</span>
      <span className="text-[10px] font-bold text-[#FF3F5A] uppercase group-hover:text-white">            {new Date(event.event_date).toLocaleString("en-US", {
  month: "short",
})}</span>
    </div>


    <div className="flex-1 min-w-0">
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="bg-red-50 text-[#FF3F5A] text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-100 uppercase tracking-wide">
          {event.tag}
        </span>
        <h3 className="text-sm sm:text-base font-bold text-gray-800 truncate group-hover:text-[#FF3F5A] transition-colors">
          {event.event}
        </h3>
      </div>
      
      {/* Meta Data Row */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-1">
        <span className="flex items-center gap-1">
          <FaMapMarkerAlt className="text-[#FF3F5A]" size={10} /> {event.location}
        </span>
        {/* <span className="flex items-center gap-1">
          <FaClock className="text-[#FF3F5A]" size={10} /> {event.time}
        </span> */}
      </div>

      <p className="text-xs text-gray-400 line-clamp-1">
        {event.dis}
      </p>
    </div>

    <Link href={event.url} target='_blank' className="flex-shrink-0 text-xs font-bold bg-white text-[#FF3F5A] border border-[#FF3F5A] px-3 py-1.5 rounded hover:bg-[#FF3F5A] hover:text-white transition-colors whitespace-nowrap">
      View
    </Link>

  </div>
))}
          </div>

          <div className="lg:col-span-1 space-y-8">
            <div className="sticky top-24 space-y-8">

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                 <div className="flex items-center gap-2 mb-4 border-b-2 border-[#FF3F5A] pb-2 w-fit">
                    <FaNewspaper className="text-[#FF3F5A]" />
                    <h3 className="font-bold text-gray-800">Recent Posts</h3>
                 </div>
                 <div className="flex flex-col gap-4">
                    {recentPosts.map((post, i) => (
                      <Link key={i} href="#" className="group flex gap-3 items-start">
                        <FaChevronRight className="mt-1 text-[#FF3F5A] text-[10px] flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <p className="text-sm text-gray-600 font-medium group-hover:text-[#FF3F5A] transition-colors leading-snug">
                          {post}
                        </p>
                      </Link>
                    ))}
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                 <div className="flex items-center gap-2 mb-4 border-b-2 border-[#FF3F5A] pb-2 w-fit">
                    <FaArchive className="text-[#FF3F5A]" />
                    <h3 className="font-bold text-gray-800">Archives</h3>
                 </div>
                 <ul className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                    {archives.map((item, index) => (
                       <li key={index} className="flex justify-between items-center text-sm text-gray-600 hover:text-[#FF3F5A] cursor-pointer border-b border-gray-50 pb-2 last:border-0 transition-colors">
                          <span>{item}</span>
                       </li>
                    ))}
                 </ul>
              </div>

            </div>
          </div>

        </div>
      </div>


    </div>
  )
}

export default EventsPage;