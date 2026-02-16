"use client"
import TopLine from '@/app/components/admin/TopLine'
import { base_url, img_url } from '@/app/components/urls'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaTrash, FaFilePdf, FaExternalLinkAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'

const Page = () => {
  const [govtpolicy, setGovtPolicy] = useState([])
  const [loading, setLoading] = useState(true)

  // 1. Fetch Data
  const fetchGovt = async () => {
    try {
      const response = await axios.get(`${base_url}/govt/get`)
      const data = await response.data;
      if (data.success) {
        setGovtPolicy(data.data)
      }
    } catch (error) {
      console.error(error)
      setGovtPolicy([])
    } finally {
      setLoading(false)
    }
  }

  // 2. Delete Function
  const handleDelete = async (id) => {
    // Confirm before deleting
    if (!window.confirm("Are you sure you want to delete this policy?")) return;

    try {
    
      const response = await axios.delete(`${base_url}/govt/delete/${id}`);
      
      if (response.data.success) {
        toast.success("Policy deleted successfully");
      
        setGovtPolicy(prev => prev.filter(item => item._id !== id));
      } else {
        toast.error("Failed to delete item");
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "Error deleting policy");
    }
  }

  useEffect(() => { fetchGovt() }, [])

  return (
    <div className='px-5 py-5 min-h-screen bg-gray-50'>
      <TopLine title="Government Policies" link="/admin/government-policies/create" />
      
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading policies...</div>
        ) : govtpolicy.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No policies found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 w-1/2">Description</th>
                  <th className="px-6 py-4 text-center">Document</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {govtpolicy.map((item, index) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                    {/* Index */}
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    
                    {/* Formatted Date */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>

                    {/* Description */}
                    <td className="px-6 py-4">
                      <p className="line-clamp-2">{item.des}</p>
                    </td>

                    {/* PDF Link */}
                    <td className="px-6 py-4 text-center">
                      <Link
                      
                        href={`${img_url}${item.pdf}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors text-xs font-medium"
                      >
                        <FaFilePdf /> View PDF
                      </Link>
                    </td>

                    {/* Delete Button */}
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page