"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowRight } from "react-icons/fa6";
import { base_url, img_url } from './urls';
import Link from 'next/link';

const BiofuelNewsSection = () => {
const subcatid=process.env.NEXT_PUBLIC_BIOFULE

const [bioFule,setBioFule]= useState([ ])


  const fetchBioFule= async()=>{
    try {
      const response = await axios.get(`${base_url}/articles/subcat/${subcatid}/?limit=4`)
      const data = await response.data;
      if(data.success){
setBioFule(data.data)
      }
    } catch (error) {
      setBioFule([ ])
    }
  }



useEffect(()=>{
  fetchBioFule()
},[])

  return (
    <section className="bg-white py-12 border-b border-gray-200">
      <div className="container px-4 mx-auto">
        
    
        <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
          <div className="flex items-center">
            <div className="w-1.5 h-8 bg-[#FF3F5A] mr-3 rounded-full hidden sm:block"></div>
            <h2 className='text-2xl sm:text-3xl font-bold text-gray-800'>Biofuel Updates</h2>
          </div>
          
          {/* <a href="#" className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#FF3F5A] transition-colors group">
            View More 
            <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform"/>
          </a> */}
        </div>

       
        <div className="flex flex-col lg:flex-row gap-4 lg:h-[500px]">
          
         {bioFule[0]
 &&           <Link href={`/articles/${bioFule[0].slug}`} className="w-full lg:w-1/2 lg:h-full relative group overflow-hidden rounded-xl cursor-pointer">
            <img 
              src={`${img_url}${bioFule[0].image}`} 
              alt="Biofuel Field" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
              <span className="inline-block w-fit px-3 py-1 mb-3 text-xs font-bold text-white bg-[#FF3F5A] rounded uppercase tracking-wider">
              {bioFule[0]?.subcategory ? bioFule[0].subcategory.name: bioFule[0].category.name }
              </span>
              <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-2">
          {bioFule[0].title}
              </h3>
              <p className="text-gray-300 text-sm md:text-base line-clamp-2" dangerouslySetInnerHTML={{__html: `${bioFule[0].details[0].description.slice(0,70)}...`}}>
             
              </p>
            </div>
          </Link>
}
      
          <div className="w-full lg:w-1/2 flex flex-col gap-4 h-full">
            
           
     {bioFule[1]   &&    <Link href={`/articles/${bioFule[1].slug}`} className=" relative group overflow-hidden rounded-xl flex-1 h-[250px] md:h-[100px] cursor-pointer">
              <img 
                src={`${img_url}${bioFule[1].image}`}
                alt="Biofuel Lab" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                <span className="text-[#FF3F5A] font-bold text-xs uppercase mb-1">   {bioFule[1]?.subcategory ? bioFule[1].subcategory.name: bioFule[1].category.name }</span>
                <h3 className="text-white text-xl font-bold leading-snug">
                 {bioFule[1].title}
                </h3>
              </div>
            </Link>
     }

            <div className=' grid md:grid-cols-2 gap-4'>
         { bioFule[2] &&      <Link href={`/articles/${bioFule[2].slug}`} className="relative group overflow-hidden rounded-xl flex-1 h-[250px] lg:h-auto cursor-pointer">
              <img 
              src={`${img_url}${bioFule[2].image}`}
                alt="Sustainable Transport" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                <span className="text-[#FF3F5A] font-bold text-xs uppercase mb-1">{bioFule[2]?.subcategory ? bioFule[2].subcategory.name: bioFule[2].category.name }</span>
                <h3 className="text-white text-xl font-bold leading-snug">
                {bioFule[2].title}
                </h3>
              </div>
            </Link>
}

        { bioFule[3] &&    <Link href={`/articles/${bioFule[3].slug}`} className="relative group overflow-hidden rounded-xl flex-1 h-[250px] lg:h-auto cursor-pointer">
              <img 
                    src={`${img_url}${bioFule[3].image}`}
                alt="Sustainable Transport" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                <span className="text-[#FF3F5A] font-bold text-xs uppercase mb-1">{bioFule[3]?.subcategory ? bioFule[3].subcategory.name: bioFule[3].category.name }</span>
                <h3 className="text-white text-xl font-bold leading-snug">
                   {bioFule[3].title}
                </h3>
              </div>
            </Link>
}
                </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default BiofuelNewsSection