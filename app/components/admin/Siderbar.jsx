"use client"
import React, { useEffect, useState } from 'react';
import {
 FiUsers,
  FiChevronLeft, FiChevronRight,
  FiMessageSquare, 
  FiLogOut, FiGrid, FiSearch
} from 'react-icons/fi';
import { RiDashboardLine, RiLinksFill, RiGovernmentFill  } from 'react-icons/ri';
import {  MdOutlineArticle  ,MdOutlineCategory } from 'react-icons/md';
import { GrTableAdd } from "react-icons/gr";

import axios from 'axios';
import LogoutPopup from './LogoutPopup';
axios.defaults.withCredentials=true;
import { TfiLayoutSliderAlt } from "react-icons/tfi";

import { IoCalendarSharp } from "react-icons/io5";


import { base_url } from '../urls';
import { usePathname, useRouter } from 'next/navigation';
import LoderCompo from '../LoderCompo';
import { toast } from 'react-toastify';
import Link from 'next/link';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
     const pathName = usePathname()

  const [loading,setLoading]= useState(true)
  const [isOpen,setIsOpen]= useState()
const route = useRouter()
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);



  const handleItemClick = (id) => setActiveItem(id);


  const menuItems = [
   
    { id: 'banners', label: 'Banners', icon: <TfiLayoutSliderAlt size={20} />, path: '/admin/banners' },
    { id: 'categories', label: 'Categories', icon: <MdOutlineCategory  size={20} />, path: '/admin/categories' },
        { id: 'adds', label: 'Adds', icon: <GrTableAdd  size={20} />, path: '/admin/adds' },
        { id: 'articles', label: 'Articles', icon: <MdOutlineArticle   size={20} />, path: '/admin/articles' },
        { id: 'Companies In Focus', label: 'Companies In Focus', icon: <RiLinksFill   size={20} />, path: '/admin/companies' },


          {
      id: 'government-policies', label: 'Government Policies', icon: <RiGovernmentFill size={20}  />, path: '/admin/government-policies'
    },
       {
      id: 'events', label: 'Events', icon: <IoCalendarSharp  size={20}  />, path: '/admin/events'
    },
    {
      id: 'subscribers', label: 'Subscribers', icon: <FiUsers size={20}  />, path: '/admin/subscribers'
    },
    { id: 'messages', label: 'Messages', icon: <FiMessageSquare size={20} />, path: '/admin/message'},
   ];

 const getAdmin = async()=>{
    setLoading(true)
    try {
        const response = await axios.get(`${base_url}/admin/verify`)
        const data = await response.data;
        if(!data.success){
            route.push("/admin/login")
        }
    } catch (error) {
        route.push("/admin/login")
        
    }finally{
        setLoading(false)
    }
 }


useEffect(()=>{
    getAdmin()
},[])


if(loading){
    return(<>
    <LoderCompo />
    </>)
}

const handelLogout = async()=>{
    try {
        const response = await axios.get(`${base_url}/admin/logout`);
        const data= await response.data;
        if(data.success){
            toast.success(data.message)
            route.push("/admin/login")
        }
    } catch (error) {
        
    }
}



const onClose=()=>{
    setIsOpen(false)
}
  return (
    <aside 
      className={`h-screen bg-white text-slate-600 border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col relative ${isCollapsed ? 'w-20' : 'w-72'}`}
    >
     <LogoutPopup isOpen={isOpen} onClose={onClose} onConfirm={handelLogout}/>
      <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
        <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
          <div className="p-2 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-lg shadow-lg shadow-indigo-500/20">
            <FiGrid className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 tracking-wide">Admin<span className="text-indigo-600">Hub</span></h1>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Enterprise</span>
          </div>
        </div>
        
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={`p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all ${isCollapsed ? 'mx-auto' : ''}`}
        >
          {isCollapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
        </button>
      </div>

      {/* --- Search Bar --- */}
      {!isCollapsed && (
        <div className="px-4 py-4">
          <div className="relative group">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-400 text-slate-700"
            />
          </div>
        </div>
      )}

      {/* --- Navigation --- */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-1 custom-scrollbar">

<div  className="relative group">
    
              <Link
               
                href={"/admin"}
                className={`
                  w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
                  ${pathName =="/admin" 
                    ? 'bg-indigo-50 text-indigo-600 shadow-[inset_3px_0_0_0_#4f46e5]' 
                    : 'hover:bg-slate-50 hover:text-slate-900 text-slate-600'} // Default Light State
                `}
              >
                {/* Icon */}
                <div className={`${pathName =="/admin"  &&  'text-slate-400 group-hover:text-indigo-500 transition-colors'}`}>
                 <RiDashboardLine size={20} />
                </div>

               
                <span className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}`}>
                Dashboard
                </span>
            </Link>
             </div>


        {menuItems.map((item) => {
          const isActive = pathName.startsWith(`${item.path}`) ;

          return (
            <div key={item.id} className="relative group">
      
              <Link
                onClick={() =>  handleItemClick(item.id)}
                href={item.path}
                className={`
                  w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-indigo-50 text-indigo-600 shadow-[inset_3px_0_0_0_#4f46e5]' 
                    : 'hover:bg-slate-50 hover:text-slate-900 text-slate-600'} // Default Light State
                `}
              >
                {/* Icon */}
                <div className={`${isActive &&  'text-slate-400 group-hover:text-indigo-500 transition-colors'}`}>
                  {item.icon}
                </div>

                {/* Label */}
                <span className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}`}>
                  {item.label}
                </span>

              

           
                {!isCollapsed && item.badge && (
                  <span className="ml-auto bg-indigo-100 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
                {isCollapsed && item.badge && (
                   <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></span>
                )}
              </Link>

            

           
            </div>
          )
        })}
      </nav>

      {/* --- Footer / User --- */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/50">
        <button className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-white hover:shadow-sm hover:border-slate-200 border border-transparent transition-all group">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center border border-white shadow-sm">
                 <span className="font-bold text-slate-600 text-xs">JD</span>
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          
          {!isCollapsed && (
             <div className="text-left">
               <p className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">John Doe</p>
               <p className="text-xs text-slate-500">Super Admin</p>
             </div>
          )}
          
          {!isCollapsed && <FiLogOut onClick={()=>setIsOpen(true)} className=" cursor-pointer ml-auto text-slate-400 group-hover:text-red-500 transition-colors" />}
        </button>
      </div>

      {/* Style for custom scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1; 
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8; 
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;