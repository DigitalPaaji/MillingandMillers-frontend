"use client";
import TopLine from "@/app/components/admin/TopLine";
import { base_url, img_url } from "@/app/components/urls";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaLink, FaCalendarAlt, FaImage, FaLocationArrow } from "react-icons/fa";
import { toast } from "react-toastify";

const Page = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to format the ISO date string into a readable format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${base_url}/events/all`);
      const data = response.data;
      if (data.success) {
        setAllEvents(data.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setAllEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
     if(confirm("Are you sure you want to delete this event?")){
         
try {
    const response =await axios.delete(`${base_url}/events/delete/${id}`);
    const data = await response.data;
    if(data.success){
        toast.success(data.message)
        fetchEvents()
    }
} catch (error) {
            toast.error(error.response.data.message)

}
}
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="px-5 py-5 min-h-screen bg-gray-50">
      <TopLine title="Events Management" link="/admin/events/create" />

      {/* Table Container */}
      <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Event Details
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Link
                </th>
                <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                    Loading events...
                  </td>
                </tr>
              ) : allEvents.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                    No events found. Click "Create" to add one.
                  </td>
                </tr>
              ) : (
                allEvents.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition-colors duration-200">
                    
                    {/* Image Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                        {item.image ? (
                          <img 
                            src={`${img_url}${item.image}`} 
                            alt="Event" 
                            className="h-full w-full object-cover" 
                          />
                        ) : (
                          <FaImage className="text-gray-400 text-lg" />
                        )}
                      </div>
                    </td>

                    {/* Event Name Column */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 line-clamp-2 max-w-[300px]" title={item.event}>
                        {item.event}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        DES: {item.dis}
                      </div>
                    </td>

                    {/* Date Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600">
                        <FaCalendarAlt className="mr-2 text-blue-500" />
                        {formatDate(item.event_date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600">
                        <FaLocationArrow  className="mr-2 text-blue-500" />
                        {item.location}
                      </div>
                    </td>

                    {/* URL Link Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {item.url ? (
                        <Link
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                          title="Visit Link"
                        >
                          <FaLink />
                        </Link>
                      ) : (
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-400 cursor-not-allowed">
                          <FaLink />
                        </span>
                      )}
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-3">
                       
                        <button 
                            onClick={() => handleDelete(item._id)}
                            className="cursor-pointer text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors"
                            title="Delete"
                        >
                          <FaTrash size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;