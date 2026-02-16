"use client"
import Link from 'next/link';
import React from 'react';
import { FiPlus } from 'react-icons/fi'; 

const TopLine = ({ title="null", link="/", label = "Create" }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight uppercase   ">
          {title}
        </h2>
      </div>

     
      <Link 
        href={link} 
        className="
          flex items-center gap-2 
          bg-indigo-600 hover:bg-indigo-700 
          text-white text-sm font-medium 
          px-4 py-2.5 rounded-lg 
          transition-all duration-200 
          shadow-sm hover:shadow-md active:scale-95
        "
      >
        {/* <FiPlus className="w-4 h-4" /> */}
        <span>{label}</span>
      </Link>
    </div>
  );
};

export default TopLine;