"use client"
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight, FaClock } from "react-icons/fa";

import axios from 'axios';
import { base_url, img_url } from './urls';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// Skeleton Loader Component
const BannerSkeleton = () => (
  <div className="relative w-full h-[600px] md:h-[80vh] bg-gray-900 animate-pulse">
    <div className="absolute inset-0 bg-gray-800"></div>
    <div className="absolute bottom-0 w-full h-32 bg-gray-800/80"></div>
  </div>
);

// Empty State Component
const EmptyBanner = () => (
  <div className="relative w-full h-[600px] md:h-[80vh] bg-gray-900 flex items-center justify-center">
    <p className="text-white text-xl">No banners available</p>
  </div>
);

const Page = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [allBanner, setAllBanner] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const swiperRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  // Fetch banners with error handling and cleanup
  const fetchBanner = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${base_url}/banner/get_all`, {
        timeout: 10000, // 10 seconds timeout
      });
      
      const data = response.data;

      if (data.success && Array.isArray(data.data)) {
        setAllBanner(data.data);
      } else {
        setError('Invalid data format received');
      }
    } catch (error) {
      console.error('Error fetching banners:', error);
      setError(error.response?.data?.message || error.message || 'Failed to load banners');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanner();
  }, [fetchBanner]);

  // Memoized active banner
  const activeBanner = useMemo(() => 
    allBanner[activeIndex] || null, 
    [allBanner, activeIndex]
  );

  // Handle slide change with debounce
  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  if (loading) return <BannerSkeleton />;
  if (error) return <EmptyBanner />;
  if (!allBanner.length) return <EmptyBanner />;

  return (
    <div className="relative w-full h-[600px] md:h-[80vh] bg-black overflow-hidden group">
      {/* Background Image with Fade Effect */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90 z-10" />
        
        {activeBanner && (
          <div className="relative w-full h-full">
            <img
              src={`${img_url}${activeBanner.desktop_image}`}
              alt={activeBanner.title || 'Banner background'}

              className="object-cover transition-transform duration-[8000ms] scale-100 w-full group-hover:scale-110"
          
          
            />
          </div>
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 flex flex-col justify-end h-full pb-40 md:pb-48">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl">
            {/* Category Tag */}
            {activeBanner?.type && (
              <span className="inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-wider text-[#FF3F5A] bg-black/30 backdrop-blur-sm border-l-4 border-[#FF3F5A]">
                {activeBanner.type}
              </span>
            )}
            
            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg leading-tight animate-fadeIn">
              {activeBanner?.title}
            </h1>
            
            {/* Meta Info */}
            {activeBanner?.created_at && (
              <div className="flex items-center gap-4 text-gray-300 text-sm">
                <span className="flex items-center gap-1">
                  <FaClock className="text-[#FF3F5A]" />
                  {new Date(activeBanner.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric'
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Carousel Section */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-16 pb-0">
        <div className="container mx-auto px-4 md:px-6 relative">
          
          {/* Navigation Buttons - Hidden on mobile, visible on md+ */}
          <div className="hidden md:block">
            <button
              ref={prevButtonRef}
              onClick={handlePrev}
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 flex items-center justify-center bg-black/50 backdrop-blur-sm text-white hover:bg-[#FF3F5A]  transition-all duration-300 rounded-full shadow-lg"
              aria-label="Previous slide"
            >
              <FaChevronLeft />
            </button>
            <button
              ref={nextButtonRef}
              onClick={handleNext}
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 flex items-center justify-center bg-black/50 backdrop-blur-sm text-white hover:bg-[#FF3F5A]  transition-all duration-300 rounded-full shadow-lg"
              aria-label="Next slide"
            >
              <FaChevronRight />
            </button>
          </div>

          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={handleSlideChange}
            slidesPerView={1.2}
            spaceBetween={16}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { 
                slidesPerView: 2,
                spaceBetween: 20 
              },
              768: { 
                slidesPerView: 3,
                spaceBetween: 24 
              },
              1024: { 
                slidesPerView: 4,
                spaceBetween: 28 
              },
            }}
            modules={[Autoplay, Navigation, EffectFade]}
            className="banner-carousel"
            navigation={{
              prevEl: prevButtonRef.current,
              nextEl: nextButtonRef.current,
            }}
          >
            {allBanner.map((item, index) => {
              const isActive = index === activeIndex;
              
              return (
                <SwiperSlide key={item.id || index} className="cursor-pointer group/slide">
                  <div
                    onClick={() => swiperRef.current?.slideTo(index)}
                    className={`
                      relative h-36 p-4 flex flex-col justify-between
                      transition-all duration-300 rounded-lg overflow-hidden
                      ${isActive 
                        ? "bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#FF3F5A] shadow-lg shadow-[#ffb400]/20" 
                        : "bg-black/40 backdrop-blur-sm border border-white/10 hover:border-white/30"
                      }
                    `}
                  >
                    {/* Card Content */}
                    <div>
                      {/* Category */}
                      <span className={`
                        inline-block px-2 py-1 mb-2 text-[10px] font-bold uppercase tracking-wider
                        ${isActive 
                          ? "text-[#FF3F5A] bg-[#ffb400]/10" 
                          : "text-gray-400 bg-white/5"
                        } rounded-sm
                      `}>
                        {item.type || 'Uncategorized'}
                      </span>

                      {/* Title */}
                      <h3 className={`
                        text-sm font-bold leading-snug line-clamp-2
                        ${isActive ? "text-[#FF3F5A]" : "text-white group-hover/slide:text-gray-200"}
                        transition-colors duration-300
                      `}>
                        {item.title}
                      </h3>
                    </div>

                    {/* Date */}
                    {item.created_at && (
                      <div className="mt-2">
                        <span className="text-[10px] text-gray-500 uppercase tracking-wide flex items-center gap-1">
                          <FaClock className="text-[10px]" />
                          {new Date(item.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    )}

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#FF3F5A]" />
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Page;