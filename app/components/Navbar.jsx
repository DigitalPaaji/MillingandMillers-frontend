"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaSearch, FaBars, FaTimes } from "react-icons/fa"
import { FaChevronDown, FaChevronRight } from "react-icons/fa6"
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from './store/categorySlice'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import { base_url } from './urls'
import { getAdds } from './store/adds'









const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [allnavLink,setAllNavLink]=useState([])
  const [searchInput,setSearchInput]= useState("")
  const [searchData,setSearchData]=useState([ ])

  const dispatch = useDispatch()
  const pathName = usePathname()
  const  {info ,isError ,isLoading} = useSelector((state)=>state.category);

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


useEffect(()=>{
   dispatch(getCategory())
   dispatch(getAdds())
},[ ])
  useEffect(()=>{

if(info?.success){
setAllNavLink(info?.data)
}

  },[info])



  const searchHandel = async(val)=>{
    try {
      const response = await axios.post(`${base_url}/articles/search`,{search:val});
      const data = await response.data;
      if(data.success){
     setSearchData(data.data)
      }
    } catch (error) {
      setSearchData([ ])
    }
  }


useEffect(()=>{
   if (searchInput.trim().length < 2){ 
    setSearchData([ ])
    return
    
   };
  const interval = setTimeout(() => {
     searchHandel(searchInput)
  }, 500);
 
  return ()=>clearTimeout(interval)
},[ searchInput])





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


<div  className="group relative h-full flex items-center">
                  
                  <Link 
                    href={"/"}
                    className={`
                      flex items-center px-3 xl:px-4 h-full
                      text-[12px] xl:text-[13px] font-bold uppercase tracking-wide 
                      transition-colors duration-200 text-gray-300 hover:text-white hover:bg-[#333]
                      ${pathName === "/" ? "bg-[#FF3F5A] text-white hover:bg-[#e0354d]" : ""}
                    `}
                  >
                   Home
                   
                  </Link>
                

                </div>
<div  className="group relative h-full flex items-center">
                  
                  <Link 
                    href={"/about"}
                    className={`
                      flex items-center px-3 xl:px-4 h-full
                      text-[12px] xl:text-[13px] font-bold uppercase tracking-wide 
                      transition-colors duration-200 text-gray-300 hover:text-white hover:bg-[#333]
                      ${pathName === "/about" ? "bg-[#FF3F5A] text-white hover:bg-[#e0354d]" : ""}
                    `}
                  >
                   About
                   
                  </Link>
                

                </div>





              {allnavLink.map((item, index) => (
                <div key={index} className="group relative h-full flex items-center">
                  
                  <Link 
                    href={`/category/${item.name.split(" ").join("-").toLowerCase()}`}
                    className={`
                      flex items-center px-3 xl:px-4 h-full
                      text-[12px] xl:text-[13px] font-bold uppercase tracking-wide 
                      transition-colors duration-200 text-gray-300 hover:text-white hover:bg-[#333]
                      ${pathName === `/${item.name}` ? "bg-[#FF3F5A] text-white hover:bg-[#e0354d]" : ""}
                    `}
                  >
                    {item.name}
                    {item.subItems && (
                      <FaChevronDown className="ml-1 text-[10px] text-gray-500 group-hover:text-white transition-transform group-hover:rotate-180" />
                    )}
                  </Link>
                  {item.subcate.length >0  && (
                    <div className="absolute left-0 top-full pt-0 w-56 translate-y-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:-translate-y-0 z-50">
                      <div className="bg-white shadow-xl border-t-4 border-[#FF3F5A] py-2">
                        {item?.subcate?.map((sub, subIndex) => (
                          <Link 
                              key={subIndex}
                           
                            href={`/category/${item.name.split(" ").join("-").toLowerCase()}?subcat=${sub._id}`}
                            className="block px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-red-50 hover:text-[#FF3F5A] hover:pl-7 transition-all duration-200 border-b border-gray-100 last:border-0"
                          >
                            {sub.name}
                          </Link>


                        ))}
                      </div>
                    </div>
                  )}
                  

                </div>
              ))}


<div  className="group relative h-full flex items-center">
  <Link 
                    href={"/events"}
                    className={`
                      flex items-center px-3 xl:px-4 h-full
                      text-[12px] xl:text-[13px] font-bold uppercase tracking-wide 
                      transition-colors duration-200 text-gray-300 hover:text-white hover:bg-[#333]
                      ${pathName === "/events" ? "bg-[#FF3F5A] text-white hover:bg-[#e0354d]" : ""}
                    `}
                  >
                Events
                   
                  </Link>
                   <Link 
                    href={"/govt-policies"}
                    className={`
                      flex items-center px-3 xl:px-4 h-full
                      text-[12px] xl:text-[13px] font-bold uppercase tracking-wide 
                      transition-colors duration-200 text-gray-300 hover:text-white hover:bg-[#333]
                      ${pathName === "/govt-policies" ? "bg-[#FF3F5A] text-white hover:bg-[#e0354d]" : ""}
                    `}
                  >
                  GOVT. POLICIES
                   
                  </Link>
                  <Link 
                    href={"/contact"}
                    className={`
                      flex items-center px-3 xl:px-4 h-full
                      text-[12px] xl:text-[13px] font-bold uppercase tracking-wide 
                      transition-colors duration-200 text-gray-300 hover:text-white hover:bg-[#333]
                      ${pathName === "/contact" ? "bg-[#FF3F5A] text-white hover:bg-[#e0354d]" : ""}
                    `}
                  >
                   Contact
                   
                  </Link>
                

                </div>


            </div>


            <div className="flex items-center relative">
              <div className="flex h-9">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchInput}
                  onChange={(e)=>setSearchInput(e.target.value)}
                  className="w-36 sm:w-40 md:w-48 px-3 text-sm text-gray-700 bg-white outline-none"
                />
                <button disabled className=" w-10 md:w-12 flex items-center justify-center  bg-white text-[#FF3F5A] transition-colors duration-300">
                  <FaSearch className="w-3.5 h-3.5" />
                </button>
              </div>


   {searchInput.length > 2 && searchData?.length > 0 && 
<div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
  {searchInput.length > 2 && searchData?.length > 0 && (
    <ul className="py-1">
      {searchData.map((item) => (
        <li key={item._id}>
          <Link 
          onClick={()=>setSearchInput("")
          }
            href={`/articles/${item.slug}`}
            className="block px-4 py-2 text-sm border-b text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
          >
          {item.title.slice(0,60)} . . .
          </Link>
        </li>
      ))}
    </ul>
  )}
</div>
}



            </div>

          </div>
        </div>

        <div 
          className={`
            lg:hidden bg-[#1a1a1a] overflow-hidden transition-all duration-500 ease-in-out
            ${isMobileMenuOpen ? "max-h-screen border-t border-gray-700 pb-10" : "max-h-0"}
          `}
        >

          <Link 
        href={`/`}
        className="block px-6 py-3 text-sm font-bold uppercase text-gray-300 border-b border-gray-800 hover:text-white hover:bg-[#333]"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Home
      </Link>
      <Link 
        href={`/about`}
        className="block px-6 py-3 text-sm font-bold uppercase text-gray-300 border-b border-gray-800 hover:text-white hover:bg-[#333]"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        About
      </Link>
         {allnavLink.map((item, index) => (
  <div key={index}>
    {/* Check if item has subcategories for Accordion behavior */}
    {item.subcate && item.subcate.length > 0 ? (
      // Accordion Header (Click to toggle)
      <div 
        onClick={() => toggleMobileSubMenu(item.name)}
        className="flex justify-between items-center px-6 py-3 text-sm font-bold uppercase text-gray-300 border-b border-gray-800 cursor-pointer hover:bg-[#333]"
      >
        <span className={mobileSubMenu === item.name ? "text-[#FF3F5A]" : ""}>
          {item.name}
        </span>
        <FaChevronDown 
          className={`text-xs transition-transform duration-300 ${mobileSubMenu === item.name ? "rotate-180 text-[#FF3F5A]" : ""}`} 
        />
      </div>
    ) : (
      // Regular Link (No subcategories)
      <Link 
        href={`/category/${item.name.split(" ").join("-").toLowerCase()}`}
        className="block px-6 py-3 text-sm font-bold uppercase text-gray-300 border-b border-gray-800 hover:text-white hover:bg-[#333]"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {item.name}
      </Link>
    )}

    {/* Mobile Submenu Items Dropdown */}
    {item.subcate && item.subcate.length > 0 && (
      <div 
        className={`bg-[#111] transition-all duration-300 overflow-hidden ${mobileSubMenu === item.name ? "max-h-[500px]" : "max-h-0"}`}
      >
        {item.subcate.map((sub, subIndex) => (
          <Link 
            key={subIndex}
            // Logic matches your desktop code: Parent Category Slug + Subcat ID
            href={`/category/${item.name.split(" ").join("-").toLowerCase()}?subcat=${sub._id}`}
            className="flex items-center px-8 py-3 text-xs font-semibold text-gray-400 border-b border-gray-800/50 hover:text-[#FF3F5A] hover:pl-10 transition-all"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaChevronRight className="mr-2 text-[8px]" /> 
            {sub.name}
          </Link>
        ))}
      </div>
    )}
  </div>
))}
<Link 
        href={`/events`}
        className="block px-6 py-3 text-sm font-bold uppercase text-gray-300 border-b border-gray-800 hover:text-white hover:bg-[#333]"
        onClick={() => setIsMobileMenuOpen(false)}
      >
       
Events
      </Link>
      <Link 
        href={`/govt-policies`}
        className="block px-6 py-3 text-sm font-bold uppercase text-gray-300 border-b border-gray-800 hover:text-white hover:bg-[#333]"
        onClick={() => setIsMobileMenuOpen(false)}
      >
       GOVT. POLICIES

      </Link>


       <Link 
        href={`/contact`}
        className="block px-6 py-3 text-sm font-bold uppercase text-gray-300 border-b border-gray-800 hover:text-white hover:bg-[#333]"
        onClick={() => setIsMobileMenuOpen(false)}
      >
 
Contact
      </Link>
        </div>
      </nav>
      {isSticky && <div className="h-14 lg:h-14"></div>}
    </>
  )
}

export default Navbar