import React from 'react';
import { FaDotCircle } from 'react-icons/fa';
import { FaArrowRight, FaFilePdf, FaLandmark } from 'react-icons/fa6';

const GovernmentPolicies = () => {
  const notifications = [
    "Amendment in Export Policy of Non-Basmati Rice under Chapter 10 of Schedule-II (Export Policy) of ITC (HS) 2022 - regarding, DGFT Notification (24/09/25).",
    "Export Policy of Second Generation (2G) Ethanol – regarding. DGFT Notification (24/09/25).",
    "Supply of essential commodities to the Republic of Maldives during 2025-26 - reg. DGFT Notification (Date 01/04/2025).",
    "Amendment in Export Policy Condition under HSN of Schedule-II (Export Policy), ITC (HS) 2022. DGFT Notification (Date 10/03/2025).",
    "Extension in Import Period for Yellow Peas under ITC (HS) Code 07131010 of Chapter 07 of ITC (HS) 2022, Schedule-I (Import Policy) - reg. DGFT Notification (Date 10/03/2025).",
    "Extension in “Free” Import Policy of Urad [Beans of SPP Vigna Mungo (L.) Hepper] [ITC (HS) Code 07133110] under ITC (HS) 2022, Schedule-I (Import Policy) – reg. DGFT Notification (Date 10/03/2025).",
    "Amendment in Export Policy of Broken Rice under HS code 1006 40 00. DGFT Notification (Date 07/03/2025).",
    "Export of Broken Rice to Senegal through National Cooperative Exports Limited (NCEL) - reg. DGFT Notification (Date 06/02/2025).",
    "Amendment in Export Policy of De-Oiled Rice Bran - reg. DGFT Notification (Date 04/02/2025).",
    "Extension in “Free” Import Policy of Tur/Pigeon Peas (Cajanus Cajan) [ITC (HS) 0713 60 00] under ITC (HS) 2022, Schedule-I (Import Policy) till 31.03.2026. DGFT Notification (Date 20/01/2025).",
    "Export of Wheat to Nepal through National Cooperative Exports Limited (NCEL) - reg. DGFT Notification (Date 04/01/2025).",
    "Amendment in Foreign Trade Policy 2023 to include Para 1.07A and 1.07B for consultation with stakeholders concerning the formulation or amendment of the Foreign Trade Policy. DGFT Notification (Date 02/01/2025).",
    "Operational Guidelines on Quality Control for Fortified Rice Kernels (FRK) and Fortified Rice (FR) - reg.",
    "Food Safety and Standards (Food Products Standards and Food Additives) Second Amendment Regulations, 2023.",
    "Food Safety and standards for Basmati Rice (including Brown Basmati Rice, Milled Basmati Rice).",
    "The Punjab Custom Milling Policy for KMS 2022-23.",
    "West Bengal Agreements with Rice Mills/Society/CMR Agencies for KMS 2022-23.",
    "Haryana Information and guidelines for Paddy Procurement and its milling during Kharif Marketing Season (KMS) 2022-23.",
    "DPR on Establishment of Rice Mill."
  ];

  return (
    <div className="container px-4 mx-auto my-10">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
        <div className="flex items-center gap-3">
          <div className="bg-[#FF3F5A] p-2 rounded-lg text-white">
            <FaLandmark size={20} />
          </div>
          <h2 className='text-2xl font-bold text-gray-800'>Government Policies/ Notifications</h2>
        </div>
         <p  className="hidden sm:flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#FF3F5A] transition-colors">
        
              View More <FaArrowRight size={12} />
                </p>
      </div>

      {/* The "Feed" Container */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        
        {/* Scrollable Area */}
        <div className="h-[500px] overflow-y-auto custom-scrollbar p-2">
          <ul className="divide-y divide-gray-100">
            {notifications.map((item, index) => (
              <li key={index} className="group p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer rounded-lg">
                <div className="flex items-start gap-4">
                  
                  {/* Icon/Bullet */}
                  <div className="mt-1 min-w-[30px] flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-red-50 text-[#FF3F5A] flex items-center justify-center group-hover:bg-[#FF3F5A] group-hover:text-white transition-colors">
                      <FaDotCircle  size={14} />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    {/* Badge for recent items */}
                    {index < 3 && (
                      <span className="inline-block px-2 py-0.5 mb-2 text-[10px] font-bold text-green-700 bg-green-100 rounded-full uppercase tracking-wider">
                        New
                      </span>
                    )}
                    <p className="text-sm text-gray-700 font-medium leading-relaxed group-hover:text-gray-900">
                      {item}
                    </p>
                    <div className="mt-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-bold text-[#FF3F5A] flex items-center gap-1">
                        Read Notification <FaArrowRight size={10} />
                      </span>
                    </div>
                  </div>

                </div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Footer Fade effect to indicate scrolling */}
        <div className="bg-gray-50 p-2 text-center border-t border-gray-100 text-xs text-gray-500 font-medium">
          Scroll to view more updates
        </div>
      </div>

      {/* CSS for Custom Scrollbar (Optional) */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ccc; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #FF3F5A; 
        }
      `}</style>
    </div>
  );
};

export default GovernmentPolicies;