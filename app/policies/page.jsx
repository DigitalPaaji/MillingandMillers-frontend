"use client"
import React, { useState } from 'react';
import { FaFilePdf, FaSearch, FaCalendarAlt, FaDownload, FaExternalLinkAlt, FaChevronRight, FaLandmark } from "react-icons/fa";

const PoliciesPage = () => {
  
  // --- STATE FOR SEARCH ---
  const [searchTerm, setSearchTerm] = useState("");

  // --- DATA: Converted your list into structured objects ---
  const policies = [
    {
      id: 1,
      title: "Amendment in Export Policy of Non-Basmati Rice under Chapter 10 of Schedule- II (Export Policy) of ITC (HS) 2022",
      date: "24 Sep 2025",
      authority: "DGFT Notification",
      category: "Export Policy",
      link: "#"
    },
    {
      id: 2,
      title: "Export Policy of Second Generation (2G) Ethanol",
      date: "24 Sep 2025",
      authority: "DGFT Notification",
      category: "Export Policy",
      link: "#"
    },
    {
      id: 3,
      title: "Supply of essential commodities to the Republic of Maldives during 2025-26",
      date: "01 Apr 2025",
      authority: "DGFT Notification",
      category: "Trade",
      link: "#"
    },
    {
      id: 4,
      title: "Amendment in Export Policy Condition under HSN of Schedule-II(Export Policy), ITC(HS) 2022",
      date: "10 Mar 2025",
      authority: "DGFT Notification",
      category: "Amendment",
      link: "#"
    },
    {
      id: 5,
      title: "Extension in Import Period for Yellow Peas under ITC(HS) Code 07131010",
      date: "10 Mar 2025",
      authority: "DGFT Notification",
      category: "Import Policy",
      link: "#"
    },
    {
      id: 6,
      title: "Extension in “Free” Import Policy of Urad [Beans of SPP Vigna Mungo (L.) Hepper]",
      date: "10 Mar 2025",
      authority: "DGFT Notification",
      category: "Import Policy",
      link: "#"
    },
    {
      id: 7,
      title: "Amendment in Export Policy of Broken Rice under HS code 1006 40 00",
      date: "07 Mar 2025",
      authority: "DGFT Notification",
      category: "Export Policy",
      link: "#"
    },
    {
      id: 8,
      title: "Export of Broken Rice to Senegal through National Cooperative Exports Limited (NCEL)",
      date: "06 Feb 2025",
      authority: "DGFT Notification",
      category: "Export Trade",
      link: "#"
    },
    {
      id: 9,
      title: "Amendment in Export Policy of De-Oiled Rice Bran",
      date: "04 Feb 2025",
      authority: "DGFT Notification",
      category: "Export Policy",
      link: "#"
    },
    {
      id: 10,
      title: "Extension in “Free” Import Policy of Tur/Pigeon Peas till 31.03.2026",
      date: "20 Jan 2025",
      authority: "DGFT Notification",
      category: "Import Policy",
      link: "#"
    },
    {
      id: 11,
      title: "Export of Wheat to Nepal through National Cooperative Exports Limited (NCEL)",
      date: "04 Jan 2025",
      authority: "DGFT Notification",
      category: "Export Trade",
      link: "#"
    },
    {
      id: 12,
      title: "Amendment in Foreign Trade Policy 2023 (Consultation with Stakeholders)",
      date: "02 Jan 2025",
      authority: "DGFT Notification",
      category: "FTP 2023",
      link: "#"
    },
    {
      id: 13,
      title: "Operational Guidelines on Quality Control for Fortified Rice Kernels (FRK) and Fortified Rice (FR)",
      date: "2024",
      authority: "Food Safety",
      category: "Quality Control",
      link: "#"
    },
    {
      id: 14,
      title: "Food Safety and Standards (Food Products Standards and Food Additives) Second Amendment Regulations, 2023",
      date: "2023",
      authority: "FSSAI",
      category: "Regulation",
      link: "#"
    },
    {
      id: 15,
      title: "Food Safety and Standards for Basmati Rice (Brown, Milled, Parboiled)",
      date: "2023",
      authority: "FSSAI",
      category: "Standards",
      link: "#"
    },
    {
      id: 16,
      title: "The Punjab Custom Milling Policy for KMS 2022-23",
      date: "2022-23",
      authority: "State Govt",
      category: "State Policy",
      link: "#"
    },
    {
      id: 17,
      title: "West Bengal Agreements with Rice Mills/Society/CMR Agencies for KMS 2022-23",
      date: "2022-23",
      authority: "State Govt",
      category: "State Policy",
      link: "#"
    },
    {
      id: 18,
      title: "Haryana Information and guidelines for Paddy Procurement and its milling",
      date: "2022-23",
      authority: "State Govt",
      category: "State Policy",
      link: "#"
    },
    {
      id: 19,
      title: "DPR on Establishment of Rice Mill",
      date: "General",
      authority: "Project Report",
      category: "Resources",
      link: "#"
    }
  ];

  // Filter Logic
  const filteredPolicies = policies.filter(policy => 
    policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      <div className="bg-[#222] text-white py-14 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center gap-3 mb-2 text-[#FF3F5A] font-bold uppercase tracking-wider text-xs">
                <FaLandmark />
                <span>Regulatory Updates</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Government Policies</h1>
            <p className="text-gray-400 max-w-2xl text-sm md:text-base">
                Stay updated with the latest DGFT notifications, export/import amendments, and state-level milling policies.
            </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          <div className="lg:col-span-3">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex items-center gap-3">
                <FaSearch className="text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search for policies (e.g., 'Rice', 'Export', 'Punjab')..." 
                    className="w-full outline-none text-gray-700 placeholder-gray-400"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-4">
                {filteredPolicies.length > 0 ? (
                    filteredPolicies.map((policy) => (
                        <div key={policy.id} className="group bg-white rounded-lg border border-gray-200 p-5 hover:border-[#FF3F5A] hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-5 md:items-center">
                            <div className="hidden md:flex flex-shrink-0 w-12 h-12 bg-gray-50 rounded-lg items-center justify-center text-red-500 group-hover:bg-[#FF3F5A] group-hover:text-white transition-colors">
                                <FaFilePdf size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                                        {policy.category}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                                        <FaCalendarAlt size={10} /> {policy.date}
                                    </span>
                                </div>
                                <h3 className="text-gray-800 font-bold text-lg leading-snug mb-1 group-hover:text-[#FF3F5A] transition-colors">
                                    {policy.title}
                                </h3>
                                <p className="text-xs text-gray-500 font-medium">
                                    Issued by: {policy.authority}
                                </p>
                            </div>

                            {/* Button */}
                            <div className="flex-shrink-0">
                                <a 
                                    href={policy.link} 
                                    className="flex items-center justify-center gap-2 px-4 py-2 rounded border border-gray-200 text-gray-600 text-sm font-bold hover:bg-[#FF3F5A] hover:border-[#FF3F5A] hover:text-white transition-all w-full md:w-auto"
                                >
                                    Read Here <FaExternalLinkAlt size={10} />
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        No policies found matching "{searchTerm}"
                    </div>
                )}
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
 
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-800 mb-4 border-b border-[#FF3F5A] pb-2 inline-block">Categories</h3>
                <ul className="space-y-2">
                    {["Export Policy", "Import Policy", "State Regulations", "Food Safety (FSSAI)", "Rice Fortification"].map((cat, i) => (
                        <li key={i} className="flex items-center justify-between text-sm text-gray-600 hover:text-[#FF3F5A] cursor-pointer">
                            <span>{cat}</span>
                            <FaChevronRight size={10} className="opacity-50" />
                        </li>
                    ))}
                </ul>
             </div>
             <div className="bg-[#FF3F5A] rounded-xl text-white p-6 shadow-lg">
                <h3 className="font-bold text-lg mb-2">Need Assistance?</h3>
                <p className="text-white/80 text-sm mb-4">Contact us for clarifications on new custom milling policies.</p>
                <button className="w-full bg-white text-[#FF3F5A] font-bold py-2 rounded text-sm hover:bg-gray-100 transition">
                    Contact Experts
                </button>
             </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default PoliciesPage