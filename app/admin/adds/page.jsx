"use client"
import TopLine from '@/app/components/admin/TopLine'
import { base_url, img_url } from '@/app/components/urls'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaExternalLinkAlt } from 'react-icons/fa'
import { HiOutlinePhotograph } from 'react-icons/hi'
import Link from 'next/link'

const Page = () => {
  const [adds, setAdds] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchAdds = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${base_url}/adds/get`)
      const data = response.data
      if (data.success) {
        setAdds(data.adds || [])
      }
    } catch (error) {
      toast.error('Failed to fetch adds')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      const response = await axios.put(`${base_url}/adds/update/${id}`, {
        status: !currentStatus
      })
      const data = response.data
      
      if (data.success) {
        toast.success(`Ad ${!currentStatus ? 'enabled' : 'disabled'}`)
     
        setAdds(prev => prev.map(ad => 
          ad._id === id ? { ...ad, status: !currentStatus } : ad
        ))
      }
    } catch (error) {
      toast.error('Failed to update status')
      console.error(error)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this ad?')) return
    
    try {
      const response = await axios.delete(`${base_url}/adds/delete/${id}`)
      const data = response.data
      
      if (data.success) {
        toast.success('Ad deleted successfully')
        setAdds(prev => prev.filter(ad => ad._id !== id))
      }
    } catch (error) {
      toast.error('Failed to delete ad')
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAdds()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className='px-5 py-5'>
      <TopLine title="Advertisements" link="/admin/adds/create" />
      
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">All Advertisements</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Total: {adds.length} ads
              </span>
              <button 
                onClick={fetchAdds}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 text-center">
            <div className="inline-block w-8 h-8 border-3 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-3 text-gray-500">Loading advertisements...</p>
          </div>
        )}

        {/* Table */}
        {!loading && adds.length === 0 ? (
          <div className="py-16 text-center">
            <HiOutlinePhotograph className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No advertisements found</h3>
            <p className="text-gray-500 mb-4">Create your first advertisement to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Link
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Count
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {adds.map((ad) => (
                  <tr key={ad._id} className="hover:bg-gray-50 transition-colors">
                    {/* Image Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-16 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                          {ad.addimg ? (
                            <img
                              src={`${img_url}${ad.addimg}`}
                              alt="Ad"
                              className="h-12 w-16 object-cover"
                              onError={(e) => {
                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNGM0YzRjMiLz48cGF0aCBkPSJNMzIgMzZDMzQuMjA5MSAzNiAzNiAzNC4yMDkxIDM2IDMyQzM2IDI5Ljc5MDkgMzQuMjA5MSAyOCAzMiAyOEMyOS43OTA5IDI4IDI4IDI5Ljc5MDkgMjggMzJDMjggMzQuMjA5MSAyOS43OTA5IDM2IDMyIDM2WiIgZmlsbD0iI0Q4RDhEOCIvPjxwYXRoIGQ9Ik00MCA0OEgyNEMyMi44OTU0IDQ4IDIyIDQ3LjEwNDYgMjIgNDZWMjJDMjIgMjAuODk1NCAyMi44OTU0IDIwIDI0IDIwSDQwQzQxLjEwNDYgMjAgNDIgMjAuODk1NCA0MiAyMlY0NkM0MiA0Ny4xMDQ2IDQxLjEwNDYgNDggNDAgNDhaTTI0IDIyVjQ2SDQwVjIySDI0WiIgZmlsbD0iI0Q4RDhEOCIvPjwvc3ZnPg=='
                              }}
                            />
                          ) : (
                            <div className="h-12 w-16 flex items-center justify-center bg-gray-100">
                              <HiOutlinePhotograph className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Link Column */}
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <Link
                          href={ad.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:underline truncate"
                        >
                          {ad.link}
                          <FaExternalLinkAlt className="w-3 h-3" />
                        </Link>
                      </div>
                    </td>

                    {/* Count Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {ad.countnumber}
                      </span>
                    </td>

                    {/* Status Column with Toggle */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleStatusToggle(ad._id, ad.status)}
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                          ad.status
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {ad.status ? (
                          <>
                            <FaToggleOn className="w-4 h-4 mr-1.5" />
                            Active
                          </>
                        ) : (
                          <>
                            <FaToggleOff className="w-4 h-4 mr-1.5" />
                            Inactive
                          </>
                        )}
                      </button>
                    </td>

                    {/* Created Date */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(ad.createdAt)}
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                       
                        
                        <button
                          onClick={() => handleDelete(ad._id)}
                          className="text-red-600 hover:text-red-800 p-1.5 rounded-md hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Table Footer */}
        {adds.length > 0 && !loading && (
          <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {adds.length} advertisement{adds.length !== 1 ? 's' : ''}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Active:</span>
                <span className="font-medium text-green-600">
                  {adds.filter(ad => ad.status).length}
                </span>
                <span className="mx-2 text-gray-400">|</span>
                <span className="text-gray-600">Inactive:</span>
                <span className="font-medium text-red-600">
                  {adds.filter(ad => !ad.status).length}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page