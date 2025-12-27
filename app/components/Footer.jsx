import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaPaperPlane, FaEnvelope, FaPhone } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-gray-300 font-sans">
      
      {/* TOP SECTION: Newsletter & Branding */}
      <div className="border-b border-gray-800">
        <div className="container px-4 mx-auto py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Logo/Brand Area */}
            <div className="text-center lg:text-left">
            <img src='/logo.png' className='bg-white' />
              <p className="mt-2 text-sm text-gray-400 max-w-md">
                Empowering the future of agriculture and biofuel with real-time updates, policy insights, and market trends.
              </p>
            </div>

            {/* Newsletter Signup */}
            <div className="w-full max-w-lg bg-gray-900/50 p-1 rounded-full border border-gray-700 flex focus-within:border-[#FF3F5A] transition-colors">
              <input 
                type="email" 
                placeholder="Enter your email for daily updates..." 
                className="flex-1 bg-transparent px-2 md:px-6 py-3 outline-none text-white placeholder-gray-500 text-sm"
              />
              <button className=" bg-[#FF3F5A] hover:bg-[#e0354d] text-white px-2 md:px-8 py-2 rounded-full font-bold text-sm transition-colors flex items-center gap-2">
                Subscribe <FaPaperPlane size={12} />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* MIDDLE SECTION: Links Grid */}
      <div className="container px-4 mx-auto py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Column 1: Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest border-l-2 border-[#FF3F5A] pl-2">Market Watch</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#FF3F5A] transition-colors">Biofuel Prices</a></li>
              <li><a href="#" className="hover:text-[#FF3F5A] transition-colors">Grain Indices</a></li>
              <li><a href="#" className="hover:text-[#FF3F5A] transition-colors">Export Data</a></li>
              <li><a href="#" className="hover:text-[#FF3F5A] transition-colors">Ethanol Demand</a></li>
              <li><a href="#" className="hover:text-[#FF3F5A] transition-colors">Global Trade</a></li>
            </ul>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest border-l-2 border-[#FF3F5A] pl-2">Categories</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#FF3F5A] transition-colors">Government Policy</a></li>
              <li><a href="#" className="hover:text-[#FF3F5A] transition-colors">Technology</a></li>
              <li><a href="#" className="hover:text-[#FF3F5A] transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-[#FF3F5A] transition-colors">Opinion & Editorial</a></li>
              <li><a href="#" className="hover:text-[#FF3F5A] transition-colors">Events & Summits</a></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest border-l-2 border-[#FF3F5A] pl-2">Organization</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#FF3F5A] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#FF3F5A] transition-colors">Our Team</a></li>
              <li><a href="#" className="hover:text-[#FF3F5A] transition-colors">Advertise with Us</a></li>
              <li><a href="#" className="hover:text-[#FF3F5A] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#FF3F5A] transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Column 4 & 5 (Spanning 2 cols on desktop): Contact Info */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest border-l-2 border-[#FF3F5A] pl-2">Get in Touch</h4>
            
            <div className="space-y-4 text-sm">
              <p className="flex items-start gap-3">
                 <span className="text-[#FF3F5A] mt-1"><FaEnvelope /></span>
                 <span>
                   <strong className="block text-gray-100">Editorial Team</strong>
                   editors@Milling and Millers.news
                 </span>
              </p>
              
              <p className="flex items-start gap-3">
                 <span className="text-[#FF3F5A] mt-1"><FaPhone /></span>
                 <span>
                   <strong className="block text-gray-100">Advertising Inquiries</strong>
                   +91 98765 43210
                 </span>
              </p>

              {/* Social Icons */}
              <div className="pt-4 flex gap-4">
                <a href="#" className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all"><FaFacebookF /></a>
                <a href="#" className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-all"><FaTwitter /></a>
                <a href="#" className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-all"><FaLinkedinIn /></a>
                <a href="#" className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-[#E4405F] hover:text-white transition-all"><FaInstagram /></a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR: Copyright */}
      <div className="bg-black py-6 border-t border-gray-900">
        <div className="container px-4 mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© 2025 Milling and Millers Media Group. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer