"use client";
import { base_url } from "@/app/components/urls";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaFilter, FaCalendarAlt, FaTags, FaTimes } from "react-icons/fa";

const FiltrerData = ({ slug, subcat, monthyear }) => {
  const [allsubcat, setAllSubCat] = useState([]);
  const [months, setMonths] = useState([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false); // State for mobile drawer
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Fetch Subcategories
  const fetchsubCat = async () => {
    try {
      const response = await axios.get(
        `${base_url}/category/subcat/${slug.split("-").join(" ")}`
      );
      const data = await response.data;
      if (data.success) {
        setAllSubCat(data.data.subcate);
      }
    } catch (error) {
      console.error("Error fetching subcategories", error);
      setAllSubCat([]);
    }
  };

  // 2. Generate Last 6 Months
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

  useEffect(() => {
    if (slug) fetchsubCat();
    generateMonths();
  }, [slug]);

  // 3. Handle Filter Selection
  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    params.set("page", "1");
    router.push(`?${params.toString()}`);
    
    // Close mobile drawer after selection for better UX
    setIsMobileOpen(false);
  };

  // Helper to clear filters
  const clearFilters = () => {
      router.push('?');
      setIsMobileOpen(false);
  }

  return (
    <>
      {/* --- Mobile Trigger Button (Visible only on small screens) --- */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center"
        aria-label="Open Filters"
      >
        <FaFilter className="text-xl" />
      </button>

      {/* --- Main Filter Container --- */}
      {/* Desktop: Sticky Sidebar 
          Mobile: Full screen fixed modal (controlled by isMobileOpen)
      */}
      <div
        className={`
          bg-white p-6 text-nowrap
          
          /* Desktop Styles (lg:...) */
          lg:rounded-xl lg:shadow-md lg:border lg:border-gray-100 lg:sticky lg:top-10 lg:block lg:w-auto lg:h-auto lg:z-0 lg:translate-y-0

          /* Mobile Styles (Base) */
          fixed inset-0 z-[1000] h-full w-full overflow-y-auto transition-transform duration-300 ease-in-out
          
          /* Mobile Toggle Logic */
          ${isMobileOpen ? "translate-y-0" : "translate-y-full lg:translate-y-0"}
        `}
      >
        {/* Mobile Header (Close Button) */}
        <div className="flex items-center justify-between lg:hidden mb-6 pb-4 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-800">Filter Results</h3>
            <button 
                onClick={() => setIsMobileOpen(false)}
                className="text-gray-500 hover:text-red-500 p-2"
            >
                <FaTimes size={24} />
            </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
          <FaFilter className="text-blue-600" />
          <h3 className="text-xl font-bold text-gray-800">Filters</h3>
        </div>

        {/* Subcategories Section */}
        {allsubcat.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <FaTags className="text-gray-400 text-sm" />
              <h4 className="font-semibold text-gray-700">Sub Categories</h4>
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  name="subcat"
                  value=""
                  checked={!subcat}
                  onChange={() => handleFilterChange("subcat", "")}
                  className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className={`text-sm group-hover:text-blue-600 transition-colors ${!subcat ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                  All
                </span>
              </label>

              {allsubcat.map((item) => (
                <label key={item._id} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="subcat"
                    value={item._id}
                    checked={subcat === item._id}
                    onChange={() => handleFilterChange("subcat", item._id)}
                    className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className={`text-sm group-hover:text-blue-600 transition-colors ${subcat === item._id ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                    {item.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Month/Year Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FaCalendarAlt className="text-gray-400 text-sm" />
            <h4 className="font-semibold text-gray-700">Archives</h4>
          </div>
          <div className="space-y-2">
             <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  name="monthyear"
                  value=""
                  checked={!monthyear}
                  onChange={() => handleFilterChange("monthyear", "")}
                  className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className={`text-sm group-hover:text-blue-600 transition-colors ${!monthyear ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                  Any Date
                </span>
              </label>

            {months.map((m, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  name="monthyear"
                  value={m.value}
                  checked={monthyear === m.value}
                  onChange={() => handleFilterChange("monthyear", m.value)}
                  className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className={`text-sm group-hover:text-blue-600 transition-colors ${monthyear === m.value ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                  {m.label}
                </span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Clear Filters Button */}
        {(subcat || monthyear) && (
          <button 
            onClick={clearFilters}
            className="mt-6 w-full py-3 lg:py-2 text-xs font-semibold text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            Clear All Filters
          </button>
        )}
      </div>
      
      {/* Mobile Overlay (Optional: Makes background dim when menu is open) */}
      {isMobileOpen && (
        <div 
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        ></div>
      )}
    </>
  );
};

export default FiltrerData;