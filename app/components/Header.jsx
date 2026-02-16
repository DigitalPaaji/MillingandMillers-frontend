"use client"
import Link from 'next/link'
import Image from 'next/image' // Import Next.js Image component
import React, { useEffect, useState } from 'react'
import { FaFacebookF, FaInstagram, FaPinterest, FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import Navbar from './Navbar'
// import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import axios from 'axios'
import { base_url } from './urls'
import Add from './Add'


const Header = () => {
 const [recentPosts,setRecentPosts]=useState([ ])
 
 
 const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  })
 const news = [
    "Breaking News: Global markets reach all-time highs today.",
    "Technology: AI revolutionizes the way we code in 2025.",
    "Sports: Championship finals set for this weekend.",
    "Weather: Heatwave expected to continue through Friday."
  ];

   const fetchArticle=async()=>{
     try {
       const response = await axios.get(`${base_url}/articles/topviews`);
       const data = await response.data;
       if(data.success){
 setRecentPosts(data.data)
       }
     } catch (error) {
setRecentPosts([ ])
     }
   }

useEffect(()=>{
  fetchArticle()
},[])
  return (
    <header className="bg-white font-sans">
      {/* Top Bar - Darker background for contrast or subtle gray */}
      <div className= "bg-gray-50 border-b border-gray-200 ">
        <div className="container px-4 mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-3">
            
            {/* Left Section - Date & Latest News */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 w-full md:w-auto justify-center md:justify-start">
              <time 
                dateTime={new Date().toISOString().split('T')[0]}
                className="text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                {todayDate}
              </time>
              
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-white px-3 ">
                <span className="text-[10px] uppercase font-bold bg-red-600 text-white px-2 py-0.5 rounded-sm tracking-wider">
                  Trending
                </span>

    <div className="h-8 w-full overflow-hidden "> 
      <Swiper
        direction={'vertical'}
        loop={true} 
        autoplay={{
          delay: 3000, 
        }}
        modules={[Autoplay]}
        className="mySwiper h-full"
      >
        {recentPosts.length > 0 && recentPosts.map((item, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center ">
            <Link href={`/articles/${item.slug}`} className="text-xs sm:text-sm  text-black  hover:text-red-600  duration-200 cursor-pointer  block w-full align-middle pt-1.5">
              {item.title.slice(0,50)} . . .
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden lg:block text-xs text-gray-400 font-medium">
                Follow us:
              </span>
              
              <div className="flex items-center gap-2">
                <SocialLink href="https://facebook.com" label="Facebook" colorClass="hover:bg-[#1877F2]">
                  <FaFacebookF className="w-3.5 h-3.5" />
                </SocialLink>
                
                <SocialLink href="https://twitter.com" label="Twitter" colorClass="hover:bg-black">
                  <FaXTwitter className="w-3.5 h-3.5" />
                </SocialLink>
                
                <SocialLink href="https://instagram.com" label="Instagram" colorClass="hover:bg-gradient-to-r from-purple-500 to-pink-500">
                  <FaInstagram className="w-3.5 h-3.5" />
                </SocialLink>
                
                <SocialLink href="https://pinterest.com" label="Pinterest" colorClass="hover:bg-[#BD081C]">
                  <FaPinterest className="w-3.5 h-3.5" />
                </SocialLink>
                
                <SocialLink href="https://youtube.com" label="YouTube" colorClass="hover:bg-[#FF0000]">
                  <FaYoutube className="w-3.5 h-3.5" />
                </SocialLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Area (Logo & Banner) */}
      <div className=" py-1 ">
        <div className="container px-4 mx-auto">
          <div className="flex flex-row justify-between items-center gap-2 md:gap-6">

           
              <Link href="/">
               
               
                <Image 
                  src="/logo2.png" 
                  alt="Site Logo" 
                  width={300} 
                  height={100} 
                  className="h-12 md:h-24 p-0 m-0 w-full"
                  priority 
                />
              
              </Link>
           

          
            <div className="w-full  md:w-2/3  flex justify-center md:justify-end ">
        <Add count={6}/>
        </div>
        </div>
        </div>
      </div>
      <Navbar />
    </header>
  )
}

// Reusable Sub-component for Social Links to keep code clean
const SocialLink = ({ href, children, label, colorClass }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={`p-2 rounded-full bg-gray-100 text-gray-500 hover:text-white transition-all duration-300 ${colorClass}`}
  >
    {children}
  </Link>
)

export default Header