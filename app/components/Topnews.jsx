"use client"
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Mousewheel } from 'swiper/modules'
import { FaCalendarAlt, FaFire, FaChevronUp, FaChevronDown, FaArrowRight } from "react-icons/fa"
// import type { Swiper as SwiperType } from 'swiper'

import 'swiper/css'
 
const Topnews = () => {
  const swiperRef = useRef(null);
  
  const newsData = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1598301257982-0cf014dabbcd?auto=format&fit=crop&w=400&q=80",
      title: "AI Revolution in Grain Milling",
      date: "Dec 24, 2025",
      desc: "How AI is transforming quality control in modern flour mills.",
      category: "Technology",
      trending: true
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=400&q=80",
      title: "Sustainable Milling Practices",
      date: "Dec 22, 2025",
      desc: "Eco-friendly techniques reducing carbon footprint by 40%.",
      category: "Sustainability",
      trending: true
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1596727147705-61a532a659bd?auto=format&fit=crop&w=400&q=80",
      title: "Wheat Market Analysis 2024",
      date: "Dec 20, 2025",
      desc: "Price fluctuations and supply chain insights for millers.",
      category: "Market",
      trending: false
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
      title: "New Food Safety Standards",
      date: "Dec 18, 2025",
      desc: "Updated regulations for milling facilities worldwide.",
      category: "Safety",
      trending: true
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
      title: "Automation in Milling Industry",
      date: "Dec 15, 2025",
      desc: "Robotics and AI integration for efficiency.",
      category: "Automation",
      trending: false
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=400&q=80",
      title: "Grain Storage Innovations",
      date: "Dec 10, 2025",
      desc: "Smart storage solutions preserving quality longer.",
      category: "Innovation",
      trending: true
    },
  ];

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <div className='py-6 md:py-8 bg-white font-sans'>
      <div className='container px-4 mx-auto '>
        
        {/* Responsive Header */}
        <div className="flex items-center justify-between mb-5 md:mb-6 border-b-[#ff3f5973] border-b py-2">
          <div className="flex items-center ">
            <div className="w-1 h-6 bg-[#FF3F5A] mr-3 rounded-full hidden sm:block"></div>
            <h2 className='text-xl sm:text-2xl font-bold text-gray-800'>Latest Milling News</h2>
          </div>
       <div>
        <p  className="hidden sm:flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#FF3F5A] transition-colors">

      View More <FaArrowRight size={12} />
        </p>
       </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6'>
          
          {/* LEFT SECTION: Static Grid */}
          <div className='lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5'>
            {newsData.slice(0, 6).map((item, index) => (
              <div 
                key={index} 
                className='group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#FF3F5A]/30 h-[130px] '
              >
                <div className="flex h-full">
                  {/* Image */}
                  <div className="relative w-1/3 sm:w-2/5 md:w-1/3 flex-shrink-0 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' 
                      loading="lazy"
                    />
                    
                  </div>
                  
                  {/* Content */}
                  <div className='p-3 md:p-4 flex flex-col justify-center flex-grow'>
                    <div className='flex items-center justify-between text-xs text-gray-500 mb-1 md:mb-2'>
                      <span className="flex items-center gap-1 text-[10px] md:text-xs">
                        <FaCalendarAlt /> {item.date}
                      </span>
                      <span className="bg-[#FF3F5A]/10 text-[#FF3F5A] text-[10px] md:text-xs font-bold px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                    </div>
                    <h3 className='text-sm md:text-base font-bold text-gray-800 leading-tight mb-1 md:mb-2 group-hover:text-[#FF3F5A] transition-colors line-clamp-2'>
                      {item.title}
                    </h3>
                    <p className='text-gray-600 text-xs md:text-sm line-clamp-2'>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SECTION: Vertical Swiper */}
          <div className='lg:col-span-1'>
            <div className=" rounded-lg p-3 md:p-4 border border-gray-100 shadow-sm h-full">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h3 className="text-sm md:text-base font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
                  <FaFire className="text-red-500" />
                  Trending Now
                </h3>
                
                {/* Navigation Controls */}
                <div className="flex items-center gap-1">
                  <button 
                    onClick={handlePrev}
                    className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center bg-gray-100 hover:bg-[#FF3F5A] hover:text-white rounded-full transition-colors"
                    aria-label="Previous"
                  >
                    <FaChevronUp className="text-xs" />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center bg-gray-100 hover:bg-[#FF3F5A] hover:text-white rounded-full transition-colors"
                    aria-label="Next"
                  >
                    <FaChevronDown className="text-xs" />
                  </button>
                </div>
              </div>

              {/* Swiper container px-4 */}
              <div className="relative h-[280px] sm:h-[300px] md:h-[340px]">
                <Swiper
                  direction={'vertical'}
                  slidesPerView={4}
                  spaceBetween={8}
                  mousewheel={{
                    forceToAxis: true,
                    sensitivity: 0.5,
                  }}
                  loop={true}
                  loopAdditionalSlides={2}
                  speed={800}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    waitForTransition: true,
                  }}
                  modules={[Autoplay, Mousewheel]}
                  className="h-full"
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                >
                  {[...newsData, ...newsData].map((item, index) => (
                    <SwiperSlide key={index} className="h-auto py-1">
                      <div className='flex gap-3 group cursor-pointer items-start py-2 hover:shadow-sm hover:rounded-lg px-2 transition-all duration-200'>
                       
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className='text-xs md:text-sm font-bold text-gray-800 leading-snug group-hover:text-[#FF3F5A] transition-colors line-clamp-2 mb-1'>
                            {item.title}
                          </h4>
                          <div className='flex items-center gap-2'>
                            <span className='text-[10px] md:text-xs text-gray-500'>
                              {item.date}
                            </span>
                            <span className="hidden sm:inline-block text-[10px] md:text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                              {item.category}
                            </span>
                          </div>
                        </div>
                        
                        {/* Thumbnail */}
                        <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300' 
                            loading="lazy"
                          />
                        </div>
                      </div>
                      
                      {/* Divider */}
                      {index < (newsData.length * 2) - 1 && (
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-2"></div>
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
                
                
              </div>
              
            
            </div>
          </div>
        </div>

     
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .swiper {
          width: 100%;
          height: 100%;
        }
        
        .swiper-wrapper {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .swiper-slide {
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }
        
        .swiper-slide-active,
        .swiper-slide-next,
        .swiper-slide-prev {
          opacity: 1;
        }
        
        .swiper-slide-active {
          transform: translateY(0);
        }
        
        /* Custom scrollbar for mousewheel */
        .swiper-vertical > .swiper-scrollbar {
          right: 3px;
          width: 2px;
        }
        
        .swiper-scrollbar-drag {
          background: #FF3F5A;
        }
        
        /* Smooth autoplay animation */
        @keyframes autoplay-progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        
        .swiper-slide {
          position: relative;
        }
        
        .swiper-slide::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 10%;
          right: 10%;
          height: 1px;
          background: linear-gradient(to right, transparent, #FF3F5A, transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .swiper-slide-active::after {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}

export default Topnews