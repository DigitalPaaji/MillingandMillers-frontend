"use client"
import ArticleSkeleton from '@/app/components/ArticleSkeleton';
import { base_url, img_url } from '@/app/components/urls';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { 
  FaCalendarAlt, 
  FaRegUser, 
  FaChevronRight, 
  FaTag, 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaClock
} from "react-icons/fa";
import { toast } from 'react-toastify';

const ArticleCompo =  ({ slug }) => {
   const [months, setMonths] = useState([]);
   const [recentPosts,setRecentPosts]=useState([ ])

  // const recentPosts = [
  //   "Haryana: Rice millers’ defy delivery rules, no action on officials",
  //   "Punjab: PAU issues advisory for yellow rust in wheat",
  //   "Flour millers protest Sindh’s (Pakistan) wheat policy",
  //   "Green waste’s fiery exit in Ludhiana: Biofuel fix",
  //   "Time For New Delhi To Choke Dhaka? Bangladesh Turns To India"
  // ];

  const archives = ["December 2025", "November 2025", "October 2025"];
const [fullArtical,setFullArtical]=useState( )
 const [email,setEmail] = useState("")


  const fetchArticle=async()=>{
    try {
      const response = await axios.get(`${base_url}/articles/singlearticles/${slug}`);
      const data = await response.data;
      if(data.success){
setFullArtical(data.data)
setRecentPosts(data.topview)
      }
    } catch (error) {
      setFullArtical(null)
    }
  }
    const generateMonths = () => {
    const monthList = [];
    const date = new Date(); // Current date

    for (let i = 0; i < 6; i++) {
      const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
      const label = d.toLocaleString("default", { month: "long", year: "numeric" });
      const monthStr = String(d.getMonth() + 1).padStart(2, "0");
      const yearStr = d.getFullYear();
      const value = `${monthStr}-${yearStr}`;

      monthList.push({ label, value });
    }
    setMonths(monthList);
  };


useEffect(()=>{
  fetchArticle()
  generateMonths()
},[ ])

if(!fullArtical){
  return<ArticleSkeleton />

}

function formatDateTime(isoString, timeZone = "Asia/Kolkata") {
  const date = new Date(isoString);

  return date.toLocaleString("en-IN", {
    timeZone,
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
}


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

  return (
    <div className="bg-white min-h-screen py-10">
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        
        {/* Main Grid Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>

          {/* Left Column: Article Content (Span 8 or 9) */}
          <div className='lg:col-span-8'>
            
            {/* Header Section */}
            <div className="mb-6">
                <div className='flex flex-wrap gap-2 mb-4'>
                {fullArtical?.tags.map((item, index) => (
                    <span key={index} className='bg-red-50 text-[#FF3F5A] px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-red-100 flex items-center gap-1'>
                        <FaTag size={10} /> {item}
                    </span>
                ))}
                </div>
                <h1 className='font-bold text-3xl md:text-4xl leading-tight text-gray-900 mb-4'>
                    {fullArtical?.title}
                </h1>
                
              
                <div className='flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-100 pb-6'>
                    <div className='flex items-center gap-2'>
                        <FaCalendarAlt className="text-[#FF3F5A]" /> 
                        <span>{formatDateTime(fullArtical?.createdAt)}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className="bg-gray-200 p-1 rounded-full">
                            <FaRegUser className="text-gray-600" size={12}/> 
                        </div>
                        <span className='capitalize font-medium text-gray-700'>{fullArtical?.author}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <FaClock className="text-[#FF3F5A]" /> 
                        <span>{fullArtical?.reading_time}</span>
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            <div className='w-full mb-8 overflow-hidden rounded-xl shadow-lg group'>
              <img 
                src={`${img_url}${fullArtical?.image}`} 
                alt={fullArtical?.title} 
                className='w-full h-[24rem] md:h-[30rem] object-cover transition-transform duration-700 group-hover:scale-105' 
              />
            </div>

            {/* Content Body */}
            <div className='prose max-w-none text-gray-700 leading-relaxed text-lg'>
              {fullArtical?.details?.map((item, index) => (
                <div key={index}>
               {item?.title &&  <b>{item.title}</b>}
                  <div 
                    className="[&>div>p]:my-6 [&>div>p]:leading-8 articaldes "
                    dangerouslySetInnerHTML={{ __html: item.description }} 
                  />
                  {item?.image && 
                  <img src={`${img_url}${item.image}`} alt="" className='w-full' />
                  }
                </div>
              ))}
            </div>

         
            <div className="mt-10 pt-6 border-t border-gray-100">
                <p className="font-bold text-gray-800 mb-4">Share this article:</p>
                <div className="flex gap-3">
                    <button className="bg-[#3b5998] text-white p-3 rounded hover:opacity-90 transition"><FaFacebookF /></button>
                    <button className="bg-[#1DA1F2] text-white p-3 rounded hover:opacity-90 transition"><FaTwitter /></button>
                    <button className="bg-[#0077b5] text-white p-3 rounded hover:opacity-90 transition"><FaLinkedinIn /></button>
                </div>
            </div>
          </div>

          <div className='lg:col-span-4'>
            <div className="sticky top-10 space-y-8">
                
                {/* Recent Posts Widget */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2 mb-6 border-b-2 border-[#FF3F5A] pb-2 w-fit pr-4">
                        <h2 className='text-lg font-bold text-gray-800'>Top Posts</h2>
                    </div>
                    
                    <div className='flex flex-col gap-4'>
                        {recentPosts.map((item, index) => (
                        <Link  key={index} href={`/articles/${item.slug}`} className='group flex gap-3 items-start'>
                             <FaChevronRight className="mt-1 text-[#FF3F5A] min-w-[12px] text-xs transition-transform group-hover:translate-x-1" />
                             <p className='text-sm text-gray-600 font-medium group-hover:text-[#FF3F5A] transition-colors leading-snug'>
                                {item.title}
                             </p>
                        </Link>
                        ))}
                    </div>
                </div>
               
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-6 border-b-2 border-[#FF3F5A] pb-2 w-fit pr-4">
                        <h2 className='text-lg font-bold text-gray-800'>Archives</h2>
                    </div>
                    <ul className="space-y-3">
                        {months.map((item, index) => (
                          <li key={index}>
                             <Link href={`/category/${fullArtical.category?.name.split(" ").join("-")}/?monthyear=${item.value}`}  className="flex justify-between text-sm text-gray-600 hover:text-[#FF3F5A] cursor-pointer border-b border-gray-100 pb-2 last:border-0">
                                <span>{item.label}</span>
                                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-400">View</span>
                             </Link>
                             </li>
                        ))}
                    </ul>
                </div>
        
                <form onSubmit={handelSub}  className="bg-[#FF3F5A] p-6 rounded-xl text-white text-center">
                    <h3 className="font-bold text-lg mb-2">Subscribe to Newsletter</h3>
                    <p className="text-xs opacity-90 mb-4">Get the latest biofuel updates delivered to your inbox.</p>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} required type="email" placeholder="Your email" className="w-full px-3 py-2 rounded border border-dashed text-black text-sm focus:outline-none mb-2" />
                    <button type='submit' className="w-full bg-gray-900 text-white py-2 rounded text-sm font-semibold hover:bg-gray-800">Subscribe</button>
                </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ArticleCompo;