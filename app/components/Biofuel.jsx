import React from 'react';
import { FaArrowRight } from "react-icons/fa6";

const BiofuelNewsSection = () => {
  return (
    <section className="bg-white py-12 border-b border-gray-200">
      <div className="container px-4 mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
          <div className="flex items-center">
            <div className="w-1.5 h-8 bg-[#FF3F5A] mr-3 rounded-full hidden sm:block"></div>
            <h2 className='text-2xl sm:text-3xl font-bold text-gray-800'>Biofuel Updates</h2>
          </div>
          
          <a href="#" className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#FF3F5A] transition-colors group">
            View More 
            <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform"/>
          </a>
        </div>

       
        <div className="flex flex-col lg:flex-row gap-4 lg:h-[500px]">
          
         
          <div className="w-full lg:w-1/2 lg:h-full relative group overflow-hidden rounded-xl cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80" 
              alt="Biofuel Field" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
              <span className="inline-block w-fit px-3 py-1 mb-3 text-xs font-bold text-white bg-[#FF3F5A] rounded uppercase tracking-wider">
                Top Story
              </span>
              <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-2">
                The Future of Agriculture: Turning Surplus Grain into Energy
              </h3>
              <p className="text-gray-300 text-sm md:text-base line-clamp-2">
                New refineries are opening across the midwest, promising a 40% reduction in waste by 2030.
              </p>
            </div>
          </div>

      
          <div className="w-full lg:w-1/2 flex flex-col gap-4 h-full">
            
           
            <div className=" relative group overflow-hidden rounded-xl flex-1 h-[250px] md:h-[100px] cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=800&q=80" 
                alt="Biofuel Lab" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                <span className="text-[#FF3F5A] font-bold text-xs uppercase mb-1">Tech Analysis</span>
                <h3 className="text-white text-xl font-bold leading-snug">
                  Lab Report: Ethanol efficiency hits new record high
                </h3>
              </div>
            </div>

            <div className=' grid md:grid-cols-2 gap-4'>
                <div className="relative group overflow-hidden rounded-xl flex-1 h-[250px] lg:h-auto cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80" 
                alt="Sustainable Transport" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                <span className="text-[#FF3F5A] font-bold text-xs uppercase mb-1">Logistics</span>
                <h3 className="text-white text-xl font-bold leading-snug">
                  How green fuel is changing the shipping industry
                </h3>
              </div>
            </div>


            <div className="relative group overflow-hidden rounded-xl flex-1 h-[250px] lg:h-auto cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80" 
                alt="Sustainable Transport" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                <span className="text-[#FF3F5A] font-bold text-xs uppercase mb-1">Logistics</span>
                <h3 className="text-white text-xl font-bold leading-snug">
                  How green fuel is changing the shipping industry
                </h3>
              </div>
            </div>
                </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default BiofuelNewsSection