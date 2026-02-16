"use client"
import React, { useEffect, useState } from 'react';
import { FaWheatAwn, FaCheck, FaArrowRight } from "react-icons/fa6";
import { base_url, img_url } from './urls';
import axios from 'axios';
import Link from 'next/link';

const WheatSection = () => {
  

  const subcatid=process.env.NEXT_PUBLIC_WHEATS
  
  const [wheats,setWheats]= useState([ ])
  
  
    const fetchBioFule= async()=>{
      try {
        const response = await axios.get(`${base_url}/articles/subcat/${subcatid}/?limit=6`)
        const data = await response.data;
        if(data.success){
  setWheats(data.data)
        }
      } catch (error) {
        setWheats([ ])
      }
    }
  
  
  
  useEffect(()=>{
    fetchBioFule()
  },[])
  return (
    <section className="bg-white font-sans overflow-hidden">
      <div className="container mx-auto px-4">
         <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
                  <div className="flex items-center">
                    <div className="w-1.5 h-8 bg-[#FF3F5A] mr-3 rounded-full hidden sm:block"></div>
                    <h2 className='text-2xl font-bold text-gray-800'>Wheats</h2>
                  </div>
                  
                  {/* <a href="#" className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#FF3F5A] transition-colors group">
                    View More 
                    <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform"/>
                  </a> */}
                </div>
       
        <div className="    bg-gray-50 ">
           
          

           <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              { wheats.length > 0 && wheats.map((item) => (
                <Link href={`/articles/${item.slug}`}  key={item._id} className="flex items-start gap-5 group p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300">
                   
                   {/* Small Thumbnail Image */}
                   <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                      <img 
                        src={`${img_url}${item.image}`} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                   </div>

                   {/* Text Content */}
                   <div>
                      <h4 className="text-lg font-bold text-gray-800 group-hover:text-[#ffb400] transition-colors mb-1">
                         {item.title.slice(0,30)}...
                      </h4>
                      <p className="text-sm text-gray-500 leading-relaxed" dangerouslySetInnerHTML={{ __html:`${item.details[0]?.description.slice(0,90)}...` }}>

                      </p>
                   </div>

                </Link>
              ))}
           </div>

         
           
        </div>

      </div>
    </section>
  )
}

export default WheatSection