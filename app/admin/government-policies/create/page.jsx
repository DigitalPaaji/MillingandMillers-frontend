"use client"
import { base_url } from '@/app/components/urls'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

// Icons
import { FaCloudUploadAlt, FaFilePdf, FaSpinner } from 'react-icons/fa'
import {  MdOutlineDescription, MdOutlinePolicy, MdOutlinepolicy } from 'react-icons/md'

const CreatePolicyPage = () => {
  const router = useRouter()
  
  // State for form data and UI status
  const [loading, setLoading] = useState(false)
  const [inputData, setInputData] = useState({
    pdf: null,
    des: ""
  })

  // Handle Text Change
  const handleTextChange = (e) => {
    setInputData(prev => ({ ...prev, des: e.target.value }))
  }

  // Handle File Change
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === "application/pdf") {
      setInputData(prev => ({ ...prev, pdf: file }))
    } else {
      toast.error("Please upload a valid PDF file.")
    }
  }

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputData.des || !inputData.pdf) {
      toast.warning("Please provide both a description and a PDF file.")
      return
    }

    setLoading(true)

    try {
      const formData = new FormData();
      formData.append("des", inputData.des);
      formData.append("pdf", inputData.pdf);

      const response = await axios.post(`${base_url}/govt/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      const data = response.data;

      if (data.success) {
        toast.success("Policy created successfully!")
        router.push("/admin/government-policies")
      }

    } catch (error) {
      console.error(error)
      const errorMsg = error.response?.data?.message || "Something went wrong. Please try again."
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-center">
          <div className="mx-auto bg-indigo-500 w-12 h-12 rounded-full flex items-center justify-center mb-3 text-white">
            <MdOutlinePolicy size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white">Upload Policy</h2>
          <p className="text-indigo-200 text-sm mt-1">Add a new government regulation doc</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Description Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MdOutlineDescription className="text-indigo-500" />
              Policy Description
            </label>
            <textarea 
              type="text" 
              placeholder="e.g. Annual Health Guidelines 2024"
              onChange={handleTextChange} 
              value={inputData.des} 
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              required 
            >
              </textarea>
          </div>

          {/* File Upload Area */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaFilePdf className="text-red-500" />
              Policy Document (PDF)
            </label>
            
            <div className="relative">
              <input 
                type="file" 
                accept="application/pdf" 
                id="pdf-upload" 
                onChange={handleFileChange} 
                className="hidden" 
                disabled={loading}
              />
              <label 
                htmlFor="pdf-upload"
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                  ${inputData.pdf 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
                  }`}
              >
                {inputData.pdf ? (
                  // State: File Selected
                  <div className="text-center p-4">
                    <FaFilePdf size={30} className="mx-auto text-red-500 mb-2" />
                    <p className="text-sm font-semibold text-gray-700 break-all line-clamp-1">
                      {inputData.pdf.name}
                    </p>
                    <p className="text-xs text-indigo-600 mt-1">Click to change</p>
                  </div>
                ) : (
                  // State: No File
                  <div className="text-center p-4">
                    <FaCloudUploadAlt size={30} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-indigo-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">PDF files only</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all shadow-md
              ${loading 
                ? 'bg-indigo-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transform active:scale-95'
              }`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" /> Uploading...
              </>
            ) : (
              "Submit Policy"
            )}
          </button>

        </form>
      </div>
    </div>
  )
}

export default CreatePolicyPage