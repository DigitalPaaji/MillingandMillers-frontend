"use client"
import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import {     FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const Page = () => {
  
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const newsData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    category: "Milling",
    title: "How to Find Urban Beauty, Amazing Mills and Silos in Australia",
    date: "Dec 09, 2025",
    author: "John Doe"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1600&q=80",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    category: "Agriculture",
    title: "Let's Go to Kansas: Check out These Amazing Wheat Harvests",
    date: "Dec 08, 2025",
    author: "Sarah Smith"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    category: "Grains",
    title: "5 Amazing Facts About Wild Grains In The United States",
    date: "Dec 06, 2025",
    author: "Mike Ross"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    category: "Machinery",
    title: "Inside Modern Milling Plants: Machines That Power the Industry",
    date: "Dec 04, 2025",
    author: "Emma Watson"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1600&q=80",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    category: "Technology",
    title: "The Future of Milling: AI Robots Taking Over the Factory Floor",
    date: "Dec 01, 2025",
    author: "David Lee"
  }
];


  return (
    <div className="relative w-full h-[600px] md:h-[80vh] bg-black overflow-hidden group">
      
      {/* 1. BACKGROUND IMAGE (Dynamic) */}
      <div className="absolute inset-0 transition-opacity duration-700">
         {/* We overlay a dark gradient to match the 'dimmed' look of the screenshot */}
         <div className="absolute inset-0 bg-black/40 z-10"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10"></div>
         
         <img 
            src={newsData[activeIndex].image} 
            alt="Background" 
            className="w-full h-full object-cover transition-transform duration-[2000ms] scale-105"
            key={activeIndex} // Key forces re-render for animation
         />
      </div>

      {/* 2. BIG TITLE OVERLAY (Optional - matches the big text in screenshot) */}
      <div className="absolute top-1/4 left-0 right-0 z-20 text-center px-4">
        <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg max-w-4xl mx-auto leading-tight">
          {newsData[activeIndex].title}
        </h1>
      </div>


      {/* 3. BOTTOM CAROUSEL (The Cards) */}
      <div className="absolute bottom-0 w-full z-30 pb-0">
         <div className="container px-4 mx-auto px-0 md:px-4 relative">
            
            {/* Navigation Buttons (Left/Right) */}
            <div className="hidden md:block">
                <button 
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-40 bg-[#1f1f1f] text-white w-10 h-10 flex items-center justify-center hover:bg-[#ffb400] transition-colors"
                    onClick={() => swiperRef.current?.slidePrev()}
                >
                    <FaChevronLeft />
                </button>
                <button 
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-40 bg-[#1f1f1f] text-white w-10 h-10 flex items-center justify-center hover:bg-[#ffb400] transition-colors"
                    onClick={() => swiperRef.current?.slideNext()}
                >
                    <FaChevronRight />
                </button>
            </div>

            <Swiper
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                slidesPerView={1.2}
                 autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
                spaceBetween={2}
                loop={true}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
                modules={[Autoplay, Navigation]}
                className="w-full  "
            >
                {newsData.map((item, index) => {
                    // Check if this specific slide is the active one
                    // Note: In loop mode, indices get tricky, but for visual simplicity here:
                    const isActive = index === activeIndex;

                    return (
                        <SwiperSlide key={item.id} className="cursor-pointer" onClick={()=>setActiveIndex(index)}>
                            <div className={`
                                relative h-32  p-3 flex flex-col justify-between transition-all duration-300 border-r border-white/10
                                ${isActive 
                                    ? "bg-[#11111196] border-t-4 border-[#ffb400]" 
                                    : "bg-[#1f1f1f]/40 hover:bg-[#252525]"   
                                }
                            `}>
                                
                             
                          
                                   
                                        <img 
                                            src={item.image} 
                                            alt="Author" 
                                            className="w-12 h-20 absolute -top-10 left-1/2 -translate-x-1/2 z-[999]  border-2 border-white object-cover"
                                        />
                              
                           

                                {/* Top Section: Category Tag */}
                                <div className="mb-2">
                                    <span className={`
                                        text-[10px] font-bold uppercase px-2 py-1 inline-block
                                        ${isActive ? "bg-transparent text-[#ffb400]" : "bg-[#2a2a2a] text-[#ffb400]"}
                                    `}>
                                        {item.category}
                                    </span>
                                </div>

                                {/* Middle Section: Title */}
                                <h3 className={`
                                    text-sm md:text-base font-bold leading-snug line-clamp-3
                                    ${isActive ? "text-[#ffb400]" : "text-white"}
                                `}>
                                    {item.title}
                                </h3>

                                {/* Bottom Section: Date */}
                                <div className="flex items-center gap-2 mt-3">
                                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wide">
                                        <i className="far fa-clock mr-1"></i> {item.date}
                                    </span>
                                </div>

                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
         </div>
      </div>
    </div>
  )
}

export default Page