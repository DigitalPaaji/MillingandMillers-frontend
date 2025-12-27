import React from 'react';
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

const ArticleCompo = async ({ slug }) => {
  // Mock Data
  const data = {
    img: "https://images.unsplash.com/photo-1592997571659-0b21ff64313b?q=80&w=870&auto=format&fit=crop",
    tags: ["BIOFUEL", "COMMODITIES"],
    title: "KBR methanol technology chosen for Saudi Arabia’s first biomethanol plant",
    date: "December 19, 2025",
    author: "Admin",
    readTime: "4 min read",
    info: [
      {
        title: "",
        des: `<div class="cm-entry-summary">
          <p class="mb-4">Engineering group KBR has been awarded a contract by Fikrat Al-Tadweer to supply its green methanol technology for Saudi Arabia’s first biomethanol plant, a project aimed at converting landfill gas into clean fuel.</p>
          <p class="mb-4">The company said its PureM™ solution will be used to produce renewable methanol at commercial scale, offering a low-cost route to cleaner fuels.</p>
          <p class="mb-4">The technology can process a wide range of feedstocks, including biogas, gasification-derived syngas, hydrogen and pure carbon dioxide, providing flexibility and improved efficiency.</p>
          <p class="mb-4">Under the agreement, KBR will deliver technology licensing, proprietary engineering design, catalysts and specialised equipment for the facility.</p>
          <blockquote class="border-l-4 border-[#FF3F5A] pl-4 italic text-gray-800 my-6 bg-gray-50 p-4 rounded-r-lg">
            “We are proud to support Fikrat Al-Tadweer in this pioneering biomethanol project, which aligns with Saudi Arabia’s national policy and its vision for a cleaner, greener future,” said Jay Ibrahim.
          </blockquote>
          <p>This article has been republished from The Bioenergy Insight.</p>
        </div>`
      }
    ]
  };

  const recentPosts = [
    "Haryana: Rice millers’ defy delivery rules, no action on officials",
    "Punjab: PAU issues advisory for yellow rust in wheat",
    "Flour millers protest Sindh’s (Pakistan) wheat policy",
    "Green waste’s fiery exit in Ludhiana: Biofuel fix",
    "Time For New Delhi To Choke Dhaka? Bangladesh Turns To India"
  ];

  const archives = ["December 2025", "November 2025", "October 2025"];

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
                {data.tags.map((item, index) => (
                    <span key={index} className='bg-red-50 text-[#FF3F5A] px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-red-100 flex items-center gap-1'>
                        <FaTag size={10} /> {item}
                    </span>
                ))}
                </div>
                <h1 className='font-bold text-3xl md:text-4xl leading-tight text-gray-900 mb-4'>
                    {data.title}
                </h1>
                
                {/* Meta Data */}
                <div className='flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-100 pb-6'>
                    <div className='flex items-center gap-2'>
                        <FaCalendarAlt className="text-[#FF3F5A]" /> 
                        <span>{data.date}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className="bg-gray-200 p-1 rounded-full">
                            <FaRegUser className="text-gray-600" size={12}/> 
                        </div>
                        <span className='capitalize font-medium text-gray-700'>{data.author}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <FaClock className="text-[#FF3F5A]" /> 
                        <span>{data.readTime}</span>
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            <div className='w-full mb-8 overflow-hidden rounded-xl shadow-lg group'>
              <img 
                src={data.img} 
                alt={data.title} 
                className='w-full h-[24rem] md:h-[30rem] object-cover transition-transform duration-700 group-hover:scale-105' 
              />
            </div>

            {/* Content Body */}
            <div className='prose max-w-none text-gray-700 leading-relaxed text-lg'>
              {data.info.map((item, index) => (
                <div key={index}>
                  {/* Note: Added styling for inner HTML paragraphs via arbitrary values */}
                  <div 
                    className="[&>div>p]:mb-6 [&>div>p]:leading-8"
                    dangerouslySetInnerHTML={{ __html: item.des }} 
                  />
                </div>
              ))}
            </div>

            {/* Share Footer */}
            <div className="mt-10 pt-6 border-t border-gray-100">
                <p className="font-bold text-gray-800 mb-4">Share this article:</p>
                <div className="flex gap-3">
                    <button className="bg-[#3b5998] text-white p-3 rounded hover:opacity-90 transition"><FaFacebookF /></button>
                    <button className="bg-[#1DA1F2] text-white p-3 rounded hover:opacity-90 transition"><FaTwitter /></button>
                    <button className="bg-[#0077b5] text-white p-3 rounded hover:opacity-90 transition"><FaLinkedinIn /></button>
                </div>
            </div>
          </div>

          {/* Right Column: Sidebar (Span 4 or 3) */}
          <div className='lg:col-span-4'>
            <div className="sticky top-10 space-y-8">
                
                {/* Recent Posts Widget */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2 mb-6 border-b-2 border-[#FF3F5A] pb-2 w-fit pr-4">
                        <h2 className='text-lg font-bold text-gray-800'>Recent Posts</h2>
                    </div>
                    
                    <div className='flex flex-col gap-4'>
                        {recentPosts.map((item, index) => (
                        <a key={index} href="#" className='group flex gap-3 items-start'>
                             <FaChevronRight className="mt-1 text-[#FF3F5A] min-w-[12px] text-xs transition-transform group-hover:translate-x-1" />
                             <p className='text-sm text-gray-600 font-medium group-hover:text-[#FF3F5A] transition-colors leading-snug'>
                                {item}
                             </p>
                        </a>
                        ))}
                    </div>
                </div>

                {/* Archives Widget */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-6 border-b-2 border-[#FF3F5A] pb-2 w-fit pr-4">
                        <h2 className='text-lg font-bold text-gray-800'>Archives</h2>
                    </div>
                    <ul className="space-y-3">
                        {archives.map((item, index) => (
                             <li key={index} className="flex justify-between text-sm text-gray-600 hover:text-[#FF3F5A] cursor-pointer border-b border-gray-100 pb-2 last:border-0">
                                <span>{item}</span>
                                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-400">12</span>
                             </li>
                        ))}
                    </ul>
                </div>
                
                {/* Newsletter Box (Bonus) */}
                <div className="bg-[#FF3F5A] p-6 rounded-xl text-white text-center">
                    <h3 className="font-bold text-lg mb-2">Subscribe to Newsletter</h3>
                    <p className="text-xs opacity-90 mb-4">Get the latest biofuel updates delivered to your inbox.</p>
                    <input type="email" placeholder="Your email" className="w-full px-3 py-2 rounded text-gray-800 text-sm focus:outline-none mb-2" />
                    <button className="w-full bg-gray-900 text-white py-2 rounded text-sm font-semibold hover:bg-gray-800">Subscribe</button>
                </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ArticleCompo;