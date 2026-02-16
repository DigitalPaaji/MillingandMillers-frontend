"use client"
import axios from 'axios';
import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { base_url } from '../components/urls';
import { toast } from 'react-toastify';
import Link from 'next/link';

const ContactPage = () => {
  const [messageData,setMessageData]= useState({
    name:"",
    email:"",
    subject:"",
    message:""
    
    })


    const handelInput = (e)=>{
      const {name,value} = e.target
      setMessageData(prev=>({...prev,[name]:value}))
    }

    const handelSend= async(e)=>{
      e.preventDefault()
      try {
        const response = await axios.post(`${base_url}/message/send`,messageData)
        const data = await response.data;
        if(data.success){
          toast.success(data.message)
          setMessageData({
             name:"",
    email:"",
    subject:"",
    message:""
          })
        }else{
          toast.error(data.message)
          
        }
      } catch (error) {
        
        toast.error(error.response.data.message)
      }
    }



  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-5xl grid grid-cols-1 md:grid-cols-2">
        
        {/* --- LEFT: Contact Info --- */}
        <div className="bg-[#FF3F5A] text-white p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <p className="mb-6 text-sm opacity-90">
            For advertising space and digital marketing opportunities.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="opacity-70" />
              <div>
                <p className="text-xs font-bold uppercase opacity-70">Call Us</p>
                <p className="font-semibold">+91 99156-39993</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="opacity-70" />
              <div>
                <p className="text-xs font-bold uppercase opacity-70">Email</p>
                <Link href="mailto:ecitechmedia@gmail.com" className="block text-sm hover:underline">ecitechmedia@gmail.com</Link>
                <Link href="mailto:millingandmillers@gmail.com" className="block text-sm hover:underline">millingandmillers@gmail.com</Link>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-xs opacity-75">A venture of <strong>Ecitech Media Solutions</strong></p>
            <Link href="https://www.millingandmillers.com" className="text-xs underline opacity-75">www.millingandmillers.com</Link>
          </div>
        </div>

        {/* --- RIGHT: Short Form --- */}
        <div className="p-8">
          <form className="space-y-4" onSubmit={handelSend}>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Name</label>
              <input type="text" required value={messageData.name} name='name' onChange={handelInput}  className="w-full px-3 py-2 border rounded text-sm focus:border-[#FF3F5A] focus:outline-none bg-gray-50" placeholder="Your Name" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Email</label>
                <input type="email" required name='email' value={messageData.email} onChange={handelInput}   className="w-full px-3 py-2 border rounded text-sm focus:border-[#FF3F5A] focus:outline-none bg-gray-50" placeholder="Email" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1" >Subject</label>
                <select required name='subject' value={messageData.subject} onChange={handelInput}  className="w-full px-3 py-2 border rounded text-sm focus:border-[#FF3F5A] focus:outline-none bg-gray-50 text-gray-700">
                  <option>Advertising Inquiry</option>
                  <option>News Submission</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Message</label>
              <textarea required name='message' value={messageData.message} onChange={handelInput}  rows="3" className="w-full px-3 py-2 border rounded text-sm focus:border-[#FF3F5A] focus:outline-none bg-gray-50 resize-none"></textarea>
            </div>

            <button type='submit' className="w-full bg-[#222] text-white py-2.5 rounded font-bold text-sm hover:bg-[#FF3F5A] transition flex justify-center items-center gap-2">
              Send Message <FaPaperPlane className="text-xs"/>
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default ContactPage;