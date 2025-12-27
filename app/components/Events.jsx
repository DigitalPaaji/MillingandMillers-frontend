import React from "react";
import Link from "next/link";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

const eventsData = [
  {
    id: 1,
    title: "Global Milling Expo 2025",
    day: "12",
    month: "JAN",
    year: "2026",
    location: "Dubai, UAE",
    desc: "The world's largest gathering of grain processing experts.",
  },
  {
    id: 2,
    title: "GrainTech Conference",
    day: "03",
    month: "FEB",
    year: "2026",
    location: "Hamburg, Germany",
    desc: "Innovations in grain storage and handling technology.",
  },
  {
    id: 3,
    title: "Flour Milling Workshop",
    day: "18",
    month: "MAR",
    year: "2026",
    location: "Pune, India",
    desc: "Hands-on training session for modern flour millers.",
  },
  {
    id: 4,
    title: "Smart Factory Summit",
    day: "05",
    month: "APR",
    year: "2026",
    location: "Chicago, USA",
    desc: "Implementing IoT and AI in milling factories.",
  },
  {
    id: 5,
    title: "Agro Processing Expo",
    day: "22",
    month: "MAY",
    year: "2026",
    location: "São Paulo, Brazil",
    desc: "Latin America's premier event for agro-processing.",
  },
  {
    id: 6,
    title: "Sustainable Milling Forum",
    day: "14",
    month: "JUN",
    year: "2026",
    location: "Tokyo, Japan",
    desc: "Strategies for carbon-neutral milling operations.",
  },
];

const Events = () => {
  return (
    <div className="  bg-gray-50 font-sans">
      <div className="container px-4 mx-auto">
        
      <div className="flex items-center justify-between mb-5 md:mb-6 border-b-[#ff3f5973] border-b py-2">
        <div>
            <div className="flex items-center gap-2 mb-1">
               <span className="bg-[#FF3F5A] h-1 w-6 rounded-full"></span>
               <span className="text-[#FF3F5A] font-bold text-xs uppercase tracking-wider">Upcoming</span>
            </div>
           <h2 className='text-xl sm:text-2xl font-bold text-gray-800 '>   Events</h2>
          </div>
                
             <div>
              <p  className="hidden sm:flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#FF3F5A] transition-colors">
      
            View More <FaArrowRight size={12} />
              </p>
             </div>
              </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {eventsData.map((event) => (
            <div
              key={event.id}
              className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-[#FF3F5A]/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="p-3 flex gap-5">
                
                {/* 1. Date Badge */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-16 bg-gray-100 rounded-lg group-hover:bg-[#FF3F5A] transition-colors duration-300">
                  <span className="text-[10px] font-bold text-gray-500 uppercase group-hover:text-white transition-colors">
                    {event.month}
                  </span>
                  <span className="text-xl font-black text-gray-800 group-hover:text-white transition-colors">
                    {event.day}
                  </span>
                </div>

                {/* 2. Event Details */}
                <div className="flex-grow">
                   <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight group-hover:text-[#FF3F5A] transition-colors line-clamp-2">
                     {event.title}
                   </h3>
                   
                   <div className="flex items-center text-xs text-gray-500 mb-2">
                      <FaMapMarkerAlt className="mr-1.5 text-gray-400 group-hover:text-[#FF3F5A]" />
                      {event.location}
                   </div>

                   <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
                      {event.desc}
                   </p>

                   {/* 3. Action Link */}
                   <Link 
                     href={`/events/${event.id}`}
                     className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-gray-900 border-b-2 border-transparent group-hover:border-[#FF3F5A] transition-all pb-0.5"
                   >
                     Register Now
                   </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
            <Link 
                href="/events" 
                className="inline-block px-6 py-3 rounded-full bg-white border border-gray-200 text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50"
            >
                View All Events
            </Link>
        </div>
         </div>
    </div>
  );
};

export default Events;