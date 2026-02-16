"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from './store/categorySlice'; // Adjust path if needed
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaPaperPlane, FaEnvelope, FaPhone } from "react-icons/fa6";
import axios from 'axios';
import { base_url } from './urls';
import { toast } from 'react-toastify';

const Footer = () => {
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.category);
  const [footerCategories, setFooterCategories] = useState([]);
const [email,setEmail]= useState("")

const handelSub= async(e)=>{
  e.preventDefault()
  try {
    if(!email) return

    const response = await axios.post(`${base_url}/subscribe/create`,{email})
    const data = await response.data;
    if(data.success){
      toast.success(data.message)
    }
    
  } catch (error) {
          toast.success(error.response.data.message)

  }finally{
    setEmail(" ")
  }
}
  // Fetch categories if not already available (redundant if Navbar fetches, but good for safety)
  useEffect(() => {
    if (!info) {
      dispatch(getCategory());
    }
  }, [dispatch, info]);

  useEffect(() => {
    if (info?.success) {
      setFooterCategories(info.data);
    }
  }, [info]);

  // Static links that exist in your Navbar but aren't dynamic categories
  const quickLinks = [
    { name: "Govt. Policies", href: "/govt-policies" },
    { name: "Events", href: "/events" },
    { name: "Press Release", href: "/press" },
    { name: "Companies In Focus", href: "/companies" },
  ];

  return (
    <footer className="bg-[#111111] text-gray-300 font-sans border-t border-gray-800">
      
      {/* TOP SECTION: Branding & Newsletter */}
      <div className="border-b border-gray-800">
        <div className="container px-4 mx-auto py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            <div className="text-center lg:text-left">
              {/* Replace with your actual Logo Image if available */}
              {/* <h2 className="text-2xl font-bold text-white uppercase tracking-wider">
                Milling <span className="text-[#FF3F5A]">&</span> Millers
              </h2> */}
              <img src="/logo.png" alt="" />
              <p className="mt-2 text-sm text-gray-400 max-w-md">
                Empowering the future of agriculture and biofuel with real-time updates, policy insights, and market trends.
              </p>
            </div>

            {/* Newsletter Signup */}
            <form  onSubmit={handelSub} className="overflow-hidden w-full max-w-lg bg-gray-900/50 p-1 rounded-full border border-gray-700 flex focus-within:border-[#FF3F5A] transition-colors">
              <input 
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
                type="email" 
                placeholder="Enter your email for daily updates..." 
                className="flex-1 bg-transparent px-2 md:px-6 py-3 outline-none text-white placeholder-gray-500 text-sm"
              />
              <button className="bg-[#FF3F5A] hover:bg-[#e0354d] text-white px-6 md:px-8 py-2 rounded-full font-bold text-sm transition-colors flex items-center gap-2">
                Subscribe <FaPaperPlane size={12} />
              </button>
            </form>

          </div>
        </div>
      </div>

      {/* MIDDLE SECTION: Links Grid */}
      <div className="container px-4 mx-auto py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Column 1: Quick Links (Matches Navbar static links) */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest border-l-2 border-[#FF3F5A] pl-2">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="hover:text-[#FF3F5A] transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Dynamic Categories (Matches Navbar API data) */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest border-l-2 border-[#FF3F5A] pl-2">
              Industries
            </h4>
            <ul className="space-y-3 text-sm">
              {footerCategories.length > 0 ? (
                footerCategories.map((item, index) => (
                  <li key={index}>
                    <Link 
                      href={`/category/${item.name.split(" ").join("-").toLowerCase()}`}
                      className="hover:text-[#FF3F5A] transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-600 text-xs">Loading categories...</li>
              )}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest border-l-2 border-[#FF3F5A] pl-2">
              Organization
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-[#FF3F5A] transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FF3F5A] transition-colors duration-200">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FF3F5A] transition-colors duration-200">Contact Us</Link>
              </li>
              <li><Link href="#" className="hover:text-[#FF3F5A] transition-colors duration-200">Our Team</Link></li>
            
            </ul>
          </div>

          {/* Column 4 & 5: Contact Info */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest border-l-2 border-[#FF3F5A] pl-2">
              Get in Touch
            </h4>
            
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                 <span className="text-[#FF3F5A] mt-1"><FaEnvelope /></span>
                 <span>
                   <strong className="block text-gray-100">Editorial Team</strong>
                   <div className='flex flex-col gap-0.5'>
                   <Link href="mailto:ecitechmedia@gmail.com" className="hover:text-white transition-colors">ecitechmedia@gmail.com</Link>
                   <Link href="mailto: millingandmillers@gmail.com" className="hover:text-white transition-colors">millingandmillers@gmail.com</Link>
               </div>  </span>
              </div>
              
              <p className="flex items-start gap-3">
                 <span className="text-[#FF3F5A] mt-1"><FaPhone /></span>
                 <span>
                   <strong className="block text-gray-100">Advertising Inquiries</strong>
                  <Link href="tel:+9199156-39993" className="hover:text-white transition-colors">+91 99156-39993</Link>
                 </span>
              </p>

              {/* Social Icons */}
             
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR: Copyright */}
      <div className="bg-black py-6 border-t border-gray-900">
        <div className="container px-4 mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© 2025 <Link href={"/"} className='text-rose-500'>  Milling and Millers </Link>  Media Group. All rights reserved.</p>
          <p>Developed and Designed By <Link href={"https://digitalpaaji.com"} target='_blank' className='text-rose-500'>  Digital Paaji.</Link></p>
         
         
           <div className="pt-4 flex gap-4">
               <Link href="#" className="w-8 h-8 rounded  flex items-center justify-center bg-[#1877F2] text-white transition-all"><FaFacebookF /></Link>
               <Link href="#" className="w-8 h-8 rounded  flex items-center justify-center bg-[#1DA1F2] text-white transition-all"><FaTwitter /></Link>
               <Link href="#" className="w-8 h-8 rounded  flex items-center justify-center bg-[#0A66C2] text-white transition-all"><FaLinkedinIn /></Link>
               <Link href="#" className="w-8 h-8 rounded  flex items-center justify-center bg-[#E4405F] text-white transition-all"><FaInstagram /></Link>
              </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer