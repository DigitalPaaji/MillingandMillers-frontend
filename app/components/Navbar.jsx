"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaSearch, FaBars, FaTimes } from "react-icons/fa"
import { FaChevronDown, FaChevronRight } from "react-icons/fa6"

// --- DATA CONFIGURATION ---
// Edit this list to change your menu easily!
const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { 
    name: "News", 
    href: "/news", 
    subItems: [
      "Rice", "Fortification", "Wheat", "Pulses", "Oilseeds", "Biofuel"
    ]
  },
  { 
    name: "Machinery", 
    href: "/machinery", 
    subItems: [
      "Rice Fortification", "Lab Equipments", "Parboiling"
    ]
  },
  { name: "Govt. Policies", href: "/policies" },
  { name: "Events", href: "/events" },
  { name: "Press Release", href: "/press" },
  { name: "Interview", href: "/interview" },
  { name: "Contact", href: "/contact" },
]

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  

  const [mobileSubMenu, setMobileSubMenu] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      
      setIsSticky(window.scrollY > 150);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileSubMenu = (name) => {
    if (mobileSubMenu === name) {
      setMobileSubMenu(""); 
    } else {
      setMobileSubMenu(name); 
    }
  }

  return (
    <>
 
      <nav 
        className={`
          bg-[#222222] font-sans w-full transition-all duration-300 z-[999]
          ${isSticky ? "fixed top-0 shadow-lg animation-slide-down" : "relative shadow-none"}
        `}
      >
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center h-12">

    
            <button 
              className="lg:hidden p-2 text-white hover:text-[#FF3F5A] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>

            <div className="hidden lg:flex items-center h-full gap-1">
              {navLinks.map((item, index) => (
                <div key={index} className="group relative h-full flex items-center">
                  
                  <Link 
                    href={item.href}
                    className={`
                      flex items-center px-3 xl:px-4 h-full
                      text-[12px] xl:text-[13px] font-bold uppercase tracking-wide 
                      transition-colors duration-200 text-gray-300 hover:text-white hover:bg-[#333]
                      ${item.name === "Home" ? "bg-[#FF3F5A] text-white hover:bg-[#e0354d]" : ""}
                    `}
                  >
                    {item.name}
                    {item.subItems && (
                      <FaChevronDown className="ml-1 text-[10px] text-gray-500 group-hover:text-white transition-transform group-hover:rotate-180" />
                    )}
                  </Link>
                  {item.subItems && (
                    <div className="absolute left-0 top-full pt-0 w-56 translate-y-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:-translate-y-0 z-50">
                      <div className="bg-white shadow-xl border-t-4 border-[#FF3F5A] py-2">
                        {item.subItems.map((sub, subIndex) => (
                          <Link 
                              key={subIndex}
                            // onClick={()=>}
                            href={`${item.href}/${sub.toLowerCase().replace(/ /g, '-')}`}
                            className="block px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-red-50 hover:text-[#FF3F5A] hover:pl-7 transition-all duration-200 border-b border-gray-100 last:border-0"
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>


            <div className="flex items-center">
              <div className="flex h-9">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-28 sm:w-40 md:w-48 px-3 text-sm text-gray-700 bg-white outline-none"
                />
                <button className="bg-[#FF3F5A] w-10 md:w-12 flex items-center justify-center text-white hover:bg-white hover:text-[#FF3F5A] transition-colors duration-300">
                  <FaSearch className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        <div 
          className={`
            lg:hidden bg-[#1a1a1a] overflow-hidden transition-all duration-500 ease-in-out
            ${isMobileMenuOpen ? "max-h-screen border-t border-gray-700 pb-10" : "max-h-0"}
          `}
        >
          {navLinks.map((item, index) => (
            <div key={index}>
              {/* Check if item has subitems for Accordion behavior */}
              {item.subItems ? (
                // Accordion Header
                <div 
                  onClick={() => toggleMobileSubMenu(item.name)}
                  className="flex justify-between items-center px-6 py-3 text-sm font-bold uppercase text-gray-300 border-b border-gray-800 cursor-pointer hover:bg-[#333]"
                >
                  <span className={mobileSubMenu === item.name ? "text-[#FF3F5A]" : ""}>{item.name}</span>
                  <FaChevronDown className={`text-xs transition-transform ${mobileSubMenu === item.name ? "rotate-180 text-[#FF3F5A]" : ""}`} />
                </div>
              ) : (
                // Regular Link
                <Link 
                  href={item.href}
                  className="block px-6 py-3 text-sm font-bold uppercase text-gray-300 border-b border-gray-800 hover:text-white hover:bg-[#333]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )}

              {/* Mobile Submenu Items */}
              {item.subItems && (
                <div className={`bg-[#111] transition-all duration-300 overflow-hidden ${mobileSubMenu === item.name ? "max-h-[500px]" : "max-h-0"}`}>
                  {item.subItems.map((sub, subIndex) => (
                     <Link 
                        key={subIndex}
                        href={`${item.href}/${sub.toLowerCase().replace(/ /g, '-')}`}
                        className="flex items-center px-8 py-3 text-xs font-semibold text-gray-400 border-b border-gray-800/50 hover:text-[#FF3F5A]"
                        onClick={() => setIsMobileMenuOpen(false)}
                     >
                       <FaChevronRight className="mr-2 text-[8px]" /> {sub}
                     </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
      {isSticky && <div className="h-14 lg:h-14"></div>}
    </>
  )
}

export default Navbar