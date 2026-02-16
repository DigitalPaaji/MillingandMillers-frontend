"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Mousewheel } from 'swiper/modules'
import { FaCalendarAlt, FaFire, FaChevronUp, FaChevronDown, FaArrowRight } from "react-icons/fa"
import 'swiper/css'
import axios from 'axios'
import { base_url, img_url } from './urls'
import Link from 'next/link'

const Topnews = () => {
  const swiperRef = useRef(null);
  const [allArticle, setAllArticle] = useState([])

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

  const fetchLatestArtical = async () => {
    try {
      const response = await axios.get(`${base_url}/articles/getarticles/latest`)
      const data = await response.data;
      if (data.success) {
        setAllArticle(data.data)
      }
    } catch (error) {
      setAllArticle([])
    }
  }

  useEffect(() => {
    fetchLatestArtical()
  }, [])

  return (
    <div className='py-8 bg-white font-sans'>
      <div className='container px-4 mx-auto'>

        {/* --- Header Section --- */}
        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
          <div className="flex items-center">
            <div className="w-1.5 h-7 bg-[#FF3F5A] mr-3 rounded-full hidden sm:block"></div>
            <h2 className='text-2xl font-bold text-gray-800 tracking-tight'>Latest Milling News</h2>
          </div>
          {/* <a href="#" className="group flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#FF3F5A] transition-colors">
            View More 
            <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-200" size={12} />
          </a> */}
        </div>

        {/* --- Main Content Grid --- */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>

          {/* LEFT SECTION: News Grid */}
          {/* We use items-stretch to make cards uniform height if needed, though fixed height is used below */}
          <div className='lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5'>
            {allArticle.length > 0 && allArticle?.slice(0, 6).map((item, index) => (
              <Link
                key={index}
                href={`/articles/${item.slug}`}
                className='group relative bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-[#FF3F5A]/20 shadow-sm hover:shadow-md transition-all duration-300 h-36'
              >
                <div className="flex h-full">
                  {/* Image Container - Fixed Width for Alignment */}
                  <div className="w-32 md:w-40 flex-shrink-0 relative overflow-hidden">
                    <img
                      src={`${img_url}${item.image}`}
                      alt={item.title}
                      className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2">
                       <span className="bg-white/90 backdrop-blur-sm text-[#FF3F5A] text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                        {item?.subcategory ? item.subcategory.name: item.category.name }
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className='p-4 flex flex-col justify-between flex-grow min-w-0'>
                    <div>
                      <h3 className='text-sm md:text-[15px] font-bold text-gray-800 leading-snug mb-1 group-hover:text-[#FF3F5A] transition-colors line-clamp-2'>
                        {item.title}
                      </h3>
                      {/* Description with raw HTML */}
                      <div className='text-gray-500 text-xs line-clamp-2 leading-relaxed opacity-80' dangerouslySetInnerHTML={{ __html: item.details[0]?.description }}></div>
                    </div>

                    <div className='flex items-center text-xs text-gray-400 mt-2'>
                      <FaCalendarAlt className="mr-1.5" size={10} />
                      <span>{new Date(item.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* RIGHT SECTION: Vertical Trending Slider */}
          <div className='lg:col-span-1 h-full'>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 h-full flex flex-col">
              
              {/* Sidebar Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
                  <span className="p-1.5 bg-red-100 rounded-full">
                    <FaFire className="text-[#FF3F5A]" size={12} />
                  </span>
                  Trending Now
                </h3>
                <div className="flex gap-1.5">
                  <button onClick={handlePrev} className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:bg-[#FF3F5A] hover:border-[#FF3F5A] hover:text-white rounded-full transition-all shadow-sm">
                    <FaChevronUp size={10} />
                  </button>
                  <button onClick={handleNext} className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:bg-[#FF3F5A] hover:border-[#FF3F5A] hover:text-white rounded-full transition-all shadow-sm">
                    <FaChevronDown size={10} />
                  </button>
                </div>
              </div>

              {/* Vertical Swiper */}
              {/* Calculate height to match the grid on the left roughly, or use flex-grow */}
              <div className="flex-grow overflow-hidden relative" style={{ height: '360px' }}>
                <Swiper
                  direction={'vertical'}
                  slidesPerView={4}
                  spaceBetween={12}
                  mousewheel={{ forceToAxis: true, sensitivity: 1 }}
                  loop={true}
                  speed={700}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  modules={[Autoplay, Mousewheel]}
                  className="h-full pb-2" // !pb-2 adds padding at bottom for shadow visibility
                  onSwiper={(swiper) => { swiperRef.current = swiper; }}
                >
                  {allArticle.length > 0 && allArticle.map((item, index) => (
                    <SwiperSlide key={index} className="h-auto">
                      <Link  href={`/articles/${item.slug}`} className='flex items-center gap-3 p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 cursor-pointer group border border-transparent hover:border-gray-100'>
                        
                        {/* Number or Dot (Optional - creates a list feel) */}
                        <div className="text-xs font-bold text-gray-300 w-4 text-center group-hover:text-[#FF3F5A]">
                          {index + 1}
                        </div>

                        {/* Thumbnail */}
                        <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden relative">
                          <img
                            src={`${img_url}${item.image}`}
                            alt={item.title}
                            className='w-full h-full object-cover'
                            loading="lazy"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className='text-xs font-bold text-gray-700 leading-snug group-hover:text-[#FF3F5A] transition-colors line-clamp-2 mb-1'>
                            {item.title}
                          </h4>
                          <span className='text-[10px] text-gray-400 bg-gray-200/50 px-1.5 py-0.5 rounded'>
                            {item?.subcategory ? item.subcategory.name: item.category.name }
                          </span>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles for specific Swiper needs */}
      <style jsx global>{`
        /* Add a faint gradient fade at the bottom of the list for visual polish */
        .swiper-vertical::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 40px;
          background: linear-gradient(to top, rgba(249,250,251, 1), transparent);
          z-index: 10;
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}

export default Topnews