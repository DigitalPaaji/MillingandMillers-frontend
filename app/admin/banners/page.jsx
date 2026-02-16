"use client"
import TopLine from '@/app/components/admin/TopLine'
import { base_url, img_url } from '@/app/components/urls'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FiEdit2, FiTrash2, FiEye, FiCopy, FiCheck } from 'react-icons/fi'
import { RiImageLine } from 'react-icons/ri'
import { toast } from 'react-toastify'

const BannersPage = () => {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBanner, setSelectedBanner] = useState(null)
  const [showPreview, setShowPreview] = useState(false)
  const [copiedId, setCopiedId] = useState(null)

  const getAllBanners = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${base_url}/banner/get_all`)
      const data = await response.data;
     
      if (data.success && data.data) {
        setBanners(data.data)
      }
    } catch (error) {
      console.error('Error fetching banners:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        await axios.delete(`${base_url}/banner/delete/${id}`)
        getAllBanners() // Refresh the list
        alert('Banner deleted successfully!')
      } catch (error) {
        console.error('Error deleting banner:', error)
        alert('Failed to delete banner')
      }
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopiedId(text)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const viewBanner = (banner) => {
    setSelectedBanner(banner)
    setShowPreview(true)
  }

  useEffect(() => {
    getAllBanners()
  }, [])


  const deleteBanner = async(id)=>{
     if (window.confirm('Are you sure you want to delete this banner?')){

       try {
         const response = await axios.delete(`${base_url}/banner/delete/${id}`);
         const data = await response.data;
         if(data.success){
           toast.success(data.message)
           getAllBanners()
          }else{
            
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.message)
          
        }
      }
  }




  return (
    <div className='px-5 py-5'>
      <TopLine title="Banners" link="/admin/banners/create" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Total Banners</div>
          <div className="text-2xl font-bold">{banners.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Active</div>
          <div className="text-2xl font-bold text-green-600">{banners.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Desktop Images</div>
          <div className="text-2xl font-bold">{banners.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Mobile Images</div>
          <div className="text-2xl font-bold">{banners.length}</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : banners.length === 0 ? (
          <div className="text-center py-12">
            <RiImageLine className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No banners yet</h3>
            <p className="text-gray-500">Create your first banner to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Banner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Images
                  </th>
                  <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {banners.map((banner) => (
                  <tr key={banner._id} className="hover:bg-gray-50 transition-colors">
                    {/* Banner Preview */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div 
                          className="relative group cursor-pointer"
                          onClick={() => viewBanner(banner)}
                        >
                          <img
                            src={`${img_url}${banner.mobile_image}`}
                            alt={banner.title}
                            className="h-16 w-24 object-cover rounded-lg border border-gray-200"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity rounded-lg flex items-center justify-center">
                            <FiEye className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Title & ID */}
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          {banner.title}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            ID: {banner._id.substring(0, 8)}...
                          </span>
                          <button
                            onClick={() => copyToClipboard(banner._id)}
                            className="text-gray-400 hover:text-gray-600"
                            title="Copy ID"
                          >
                            {copiedId === banner._id ? (
                              <FiCheck className="w-4 h-4 text-green-500" />
                            ) : (
                              <FiCopy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {banner.type}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(banner.createdAt)}
                    </td>

                    {/* Images */}
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <div className="relative group">
                          <img
                            src={`${img_url}${banner.mobile_image}`}
                            alt="Mobile"
                            className="w-10 h-10 object-cover rounded border border-gray-200"
                          />
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Mobile
                          </div>
                        </div>
                        <div className="relative group">
                          <img
                            src={`${img_url}${banner.desktop_image}`}
                            alt="Desktop"
                            className="w-10 h-10 object-cover rounded border border-gray-200"
                          />
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Desktop
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => viewBanner(banner)}
                          className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <FiEye className="w-5 h-5" />
                        </button>
                      
                        <button
                          onClick={() => deleteBanner(banner._id)}
                          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Banner Preview Modal */}
      {showPreview && selectedBanner && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setShowPreview(false)}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full">
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Banner Preview</h3>
                    <p className="text-gray-600 mt-1">Previewing: {selectedBanner.title}</p>
                  </div>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FiEye className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  {/* Desktop Preview */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Desktop View</span>
                      <span className="text-sm text-gray-500">(1920x600 recommended)</span>
                    </div>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={`${img_url}${selectedBanner.desktop_image}`}
                        alt="Desktop banner"
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>

                  {/* Mobile Preview */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="font-medium">Mobile View</span>
                      <span className="text-sm text-gray-500">(768x400 recommended)</span>
                    </div>
                    <div className="flex justify-center">
                      <div className="relative w-64 border-8 border-gray-800 rounded-3xl overflow-hidden">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-1.5 bg-gray-800 rounded-b-lg"></div>
                        <img
                          src={`${img_url}${selectedBanner.mobile_image}`}
                          alt="Mobile banner"
                          className="w-full h-80 object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-500">Title</div>
                      <div className="font-medium">{selectedBanner.title}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Type</div>
                      <div className="font-medium">{selectedBanner.type}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Created</div>
                      <div className="font-medium">{formatDate(selectedBanner.createdAt)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Last Updated</div>
                      <div className="font-medium">{formatDate(selectedBanner.updatedAt)}</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                 
                  <button
                    onClick={() => setShowPreview(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BannersPage