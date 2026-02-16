"use client"
import { base_url } from '@/app/components/urls'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
// Importing icons
import { FaUser, FaEnvelope, FaRegClock, FaTrash, FaCheckDouble } from 'react-icons/fa'
import { MdMarkEmailUnread, MdOutlineSubject } from "react-icons/md";
import { toast } from 'react-toastify'

const MessagesPage = () => {
    const [allmessage, setAllMessage] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchMessage = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${base_url}/message/get`);
            const data = await response.data;
            if (data.success) {
                setAllMessage(data.data)
            }
        } catch (error) {
            console.error("Error fetching messages:", error)
            setAllMessage([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMessage()
    }, [])

   
    const markread=async(id)=>{
try {
    const response = await axios.put(`${base_url}/message/read/${id}`)
    const data = await response.data;
    if(data.success){
        toast.success(data.message)
        fetchMessage()
    }
} catch (error) {
            toast.success(error.response.data.message)

}


    }

     const deleteMessage=async(id)=>{
try {
    const response = await axios.delete(`${base_url}/message/delete/${id}`)
    const data = await response.data;
    if(data.success){
        toast.success(data.message)
        fetchMessage()
    }
} catch (error) {
            toast.success(error.response.data.message)

}


    }


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
       <div className="min-h-screen bg-gray-50 p-6 md:p-10">
    {/* Header Section */}
    <div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Inbox</h1>
            <p className="text-gray-500 mt-1">You have {allmessage.length} total messages</p>
        </div>
        <button 
            onClick={fetchMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-sm flex items-center gap-2"
        >
            Refresh List
        </button>
    </div>

    {/* Table Container */}
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-600 font-semibold uppercase tracking-wider border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 w-24">Status</th>
                        <th className="px-6 py-4">Sender</th>
                        <th className="px-6 py-4">Subject</th>
                        <th className="px-6 py-4 w-1/3">Message</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {allmessage.length > 0 ? (
                        allmessage.map((msg) => (
                            <tr 
                                key={msg._id} 
                                className={`hover:bg-blue-50 transition-colors duration-150 ${!msg.read ? 'bg-white' : 'bg-gray-50/50'}`}
                            >
                                {/* Status Column */}
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                        ${msg.read 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {msg.read ? 'Read' : 'New'}
                                    </span>
                                </td>

                                {/* Sender Column */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                                            ${msg.read ? 'bg-gray-200 text-gray-500' : 'bg-blue-100 text-blue-600'}`}>
                                            <FaUser />
                                        </div>
                                        <div>
                                            <p className={`text-gray-900 ${!msg.read ? 'font-bold' : 'font-medium'}`}>
                                                {msg.name}
                                            </p>
                                            <p className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                                                <FaEnvelope size={10}/> {msg.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Subject Column */}
                                <td className="px-6 py-4">
                                    <div className={`flex items-center gap-2 text-gray-800 ${!msg.read ? 'font-semibold' : ''}`}>
                                        <MdOutlineSubject className="text-gray-400" size={16} />
                                        {msg.subject}
                                    </div>
                                </td>

                                {/* Message Column (Truncated) */}
                                <td className="px-6 py-4">
                                    <div className="max-w-xs md:max-w-md truncate text-gray-500" title={msg.message}>
                                        {msg.message}
                                    </div>
                                </td>

                                {/* Date Column */}
                                <td className="px-6 py-4 text-gray-500">
                                    <div className="flex items-center gap-1.5">
                                        <FaRegClock size={12}/>
                                        {formatDate(msg.createdAt)}
                                    </div>
                                </td>

                                {/* Actions Column */}
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <button 
                                            onClick={() => { msg.read ? "" : markread(msg._id) }} 
                                            disabled={msg.read}
                                            className={`p-2 rounded-full transition-colors 
                                                ${msg.read 
                                                    ? 'text-gray-300 cursor-not-allowed' 
                                                    : 'text-blue-600 hover:bg-blue-100'}`}
                                            title={msg.read ? "Already Read" : "Mark as Read"}
                                        >
                                            {msg.read ? <FaCheckDouble size={16} /> : <MdMarkEmailUnread size={18} />}
                                        </button>
                                        
                                        <button 
                                            onClick={() => deleteMessage(msg._id)} 
                                            className="p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                            title="Delete Message"
                                        >
                                            <FaTrash size={15} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-6 py-12 text-center">
                                <div className="flex flex-col items-center justify-center text-gray-400">
                                    <div className="bg-gray-100 p-4 rounded-full mb-3">
                                        <MdOutlineSubject size={32} />
                                    </div>
                                    <p className="text-lg font-medium text-gray-600">No messages found</p>
                                    <p className="text-sm">Your inbox is currently empty.</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        
        {/* Optional Footer for Table */}
        {allmessage.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-xs text-gray-500 flex justify-between">
                <span>Showing {allmessage.length} entries</span>
                <span>Sorted by Date (Newest)</span>
            </div>
        )}
    </div>
</div>
    )
}

export default MessagesPage