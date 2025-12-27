import React from 'react';
import { FaQuoteLeft, FaIndustry, FaUserTie, FaCheckCircle, FaSeedling } from "react-icons/fa";
import { MdGrain } from "react-icons/md";

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen font-sans text-gray-700">
      
      {/* --- 1. HERO SECTION --- */}
      <div className="relative h-[400px] w-full flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1089&auto=format&fit=crop" 
            alt="Grain Milling" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
        </div>

        {/* Hero Text */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="bg-[#FF3F5A] text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block">
            Est. 2024
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Bridging the Gap in <br/> <span className="text-[#FF3F5A]">Advanced Grain Milling</span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
            India's first digital platform purely dedicated to millers and post-harvest technology.
          </p>
        </div>
      </div>

      {/* --- 2. INTRODUCTION & MISSION --- */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left: Text Content */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 relative">
                Who We Are
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#FF3F5A] rounded"></span>
              </h2>
              <p className="mb-6 leading-relaxed">
                <strong className="text-gray-900">Milling and Millers</strong> delivers the latest and most relevant information about agriculture in general and the post-harvest industry in particular. 
              </p>
              <p className="mb-6 leading-relaxed">
                We act as a <strong>connecting bridge</strong> between the post-harvest industry and its end users—the millers. We believe that relevant information is the "holy grail" of success, and we strive to keep this grail full of much-needed news insights, research findings, and developments.
              </p>
              
              <div className="bg-gray-50 border-l-4 border-[#FF3F5A] p-6 rounded-r-lg mt-8">
                <FaQuoteLeft className="text-[#FF3F5A] opacity-20 text-4xl mb-2"/>
                <p className="italic text-gray-600 font-medium">
                  "A one-stop destination for the grain milling industry, providing authentic information about recent trends and future predictions."
                </p>
              </div>
            </div>

            {/* Right: Abstract Visual/Image */}
            <div className="relative">
               <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#FF3F5A]/10 rounded-full z-0"></div>
               <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gray-100 rounded-full z-0"></div>
               <img 
                 src="https://images.unsplash.com/photo-1530267981375-f0de937f5f13?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                 alt="Milling Technology" 
                 className="relative z-10 rounded-lg shadow-2xl w-full object-cover h-[400px]"
               />
               <div className="absolute bottom-8 left-[-20px] z-20 bg-white p-4 shadow-lg rounded-lg border-l-4 border-[#FF3F5A] hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                        <FaSeedling />
                    </div>
                    <div>
                        <p className="font-bold text-gray-900">100% Focused</p>
                        <p className="text-xs text-gray-500">On Grain Technology</p>
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- 3. BENEFITS SECTION --- */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us?</h2>
            <p className="text-gray-500 mt-2">Dedicated values for every stakeholder in the ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: For Millers */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#FF3F5A] group">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-[#FF3F5A] text-2xl mb-6 group-hover:scale-110 transition-transform">
                <FaUserTie />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Millers</h3>
              <p className="text-gray-500 mb-6">Empowering individual millers with the data they need to grow profits.</p>
              <ul className="space-y-3">
                {[
                  "Latest news and developments",
                  "New research insights",
                  "Advanced technology for efficiency",
                  "Profit generation strategies"
                ].map((item, i)=>(
                  <li key={i} className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={14} />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2: For Industry */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-gray-800 group">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-800 text-2xl mb-6 group-hover:scale-110 transition-transform">
                <FaIndustry />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For The Industry</h3>
              <p className="text-gray-500 mb-6">Strengthening the R&D and policy framework for the entire sector.</p>
              <ul className="space-y-3">
                {[
                  "Trends and pattern analysis",
                  "R&D support information",
                  "Government Policy updates",
                  "Direct connection with suppliers & agents"
                ].map((item, i)=>(
                  <li key={i} className="flex items-start gap-3">
                    <FaCheckCircle className="text-[#FF3F5A] mt-1 flex-shrink-0" size={14} />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* --- 4. ORGANIZATION FOOTER NOTE --- */}
      <section className="bg-[#222] py-12 text-center text-gray-400">
        <div className="container mx-auto px-4">
            <div className="inline-flex items-center justify-center p-3 bg-gray-800 rounded-full mb-4">
                <MdGrain className="text-[#FF3F5A] text-xl" />
            </div>
            <h4 className="text-white text-lg font-semibold mb-2">Our Organization</h4>
            <p className="max-w-xl mx-auto text-sm">
                Milling and Millers is a proud digital news and magazine venture of <br/>
                <span className="text-[#FF3F5A] font-bold">Ecitech Media Solutions</span>.
            </p>
        </div>
      </section>

    </div>
  )
}

export default AboutPage