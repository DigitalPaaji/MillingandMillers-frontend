"use client"
import { base_url } from '@/app/components/urls'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
// Importing React Icons
import { FaEnvelope, FaCalendarAlt, FaUserFriends, FaTrash } from 'react-icons/fa'
import { MdContentCopy, MdOutlineMarkEmailRead } from "react-icons/md";

const SubscribersPage = () => {
    const [subs, setSubs] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchSub = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${base_url}/subscribe/get`)
            const data = await response.data;
            if(data.success || data.data) {
                // Handle case where data might be nested or direct
                setSubs(data.data || [])
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || "Failed to fetch subscribers")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSub()
    }, [])

    // Helper: Format Date
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    // Helper: Copy Email
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Email copied to clipboard!");
    }


    const handleDelete =async (id) => {
        if(confirm("Are you sure you want to remove this subscriber?")) {
         
try {
    const response = await axios.delete(`${base_url}/subscribe/delete/${id}`)
    const data = await response.data;
    toast.success(data.message)
    fetchSub()
} catch (error) {
    toast.error(error.response.data.message)
}


        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <FaUserFriends className="text-blue-600" />
                            Subscribers
                        </h1>
                        <p className="text-gray-500 mt-1">Manage your newsletter audience</p>
                    </div>
                    <div className="bg-white px-6 py-2 rounded-lg shadow-sm border border-gray-200 flex items-center gap-2">
                        <span className="text-gray-500 text-sm font-medium">Total Active:</span>
                        <span className="text-2xl font-bold text-blue-600">{subs.length}</span>
                    </div>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 font-semibold">Subscriber Email</th>
                                    <th className="px-6 py-4 font-semibold">Joined Date</th>
                                    <th className="px-6 py-4 font-semibold">ID Reference</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {subs.length > 0 ? (
                                    subs.map((sub) => (
                                        <tr key={sub._id} className="hover:bg-blue-50/50 transition-colors duration-200 group">
                                            
                                            {/* Email Column */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                                        <FaEnvelope />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-800">{sub.email}</p>
                                                        <p className="text-xs text-green-600 flex items-center gap-1 mt-0.5">
                                                            <MdOutlineMarkEmailRead /> Verified
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Date Column */}
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <FaCalendarAlt className="text-gray-400" />
                                                    {formatDate(sub.createdAt)}
                                                </div>
                                            </td>

                                            {/* ID Column */}
                                            <td className="px-6 py-4">
                                                <code className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
                                                    {sub._id.substring(0, 8)}...
                                                </code>
                                            </td>

                                            {/* Actions Column */}
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button 
                                                        onClick={() => copyToClipboard(sub.email)}
                                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-all"
                                                        title="Copy Email"
                                                    >
                                                        <MdContentCopy size={18} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(sub._id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-full transition-all"
                                                        title="Remove Subscriber"
                                                    >
                                                        <FaTrash size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center">
                                                <FaUserFriends size={48} className="text-gray-200 mb-4" />
                                                <p className="text-lg font-medium">No subscribers yet</p>
                                                <p className="text-sm">Wait for users to sign up to your newsletter.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Footer / Pagination Placeholder */}
                    {subs.length > 0 && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
                            <span>Showing all records</span>
                            <span>Last updated: {new Date().toLocaleDateString()}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SubscribersPage