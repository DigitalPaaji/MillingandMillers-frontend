"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa6'
import { base_url, img_url } from './urls'
import Link from 'next/link'

const Companies = () => {
    const [focusCompaines,setFocusCompaines] = useState([ ])
 const fetChCompany = async()=>{
  try {
    const response = await axios.get(`${base_url}/compaines/get/random`)
    const data = await response.data;
setFocusCompaines(data.allComp)
  } catch (error) {
    setFocusCompaines([ ])
  }
 }

useEffect(()=>{
  fetChCompany()
},[])
  return (
    <div>
        <div className='container mx-auto px-4'>
  <div className="flex items-center justify-between mb-5 md:mb-6 border-b-[#ff3f5973] border-b py-2">
          <div className="flex items-center ">
            <div className="w-1 h-6 bg-[#FF3F5A] mr-3 rounded-full hidden sm:block"></div>
            <h2 className='text-xl sm:text-2xl font-bold text-gray-800'>Companies In Focus</h2>
          </div>
       <div>
        <p  className="hidden sm:flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#FF3F5A] transition-colors">

      View More <FaArrowRight size={12} />
        </p>
       </div>
        </div>
     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
{focusCompaines.length > 0 &&  focusCompaines.map((item,index)=><Link key={index} href={item?.link} target='_blank' > <img src={`${img_url}${item.image}`} key={index} className='shadow-md shadow-amber-100 border border-gray-600/50 cursor-pointer' /></Link>)}  </div>
    
    





        </div>
    </div>
  )
}

export default Companies