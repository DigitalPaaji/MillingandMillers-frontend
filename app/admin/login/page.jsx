"use client"
import { base_url } from '@/app/components/urls';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaUserShield, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminLogin = () => {
    const route = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
  try {
    const response = await axios.post(`${base_url}/admin/login`,formData,{withCredentials:true})
    const data =  await response.data;
    if(data.success){
        toast.success(data.message)
        route.push("/admin")
    }else{
        toast.error(data.message)
        
    }
    
} catch (error) {

      toast.error(error.response.data.message)
    
  }
  };


   const getAdmin = async()=>{

    try {
        const response = await axios.get(`${base_url}/admin/verify`)
        const data = await response.data;
        if(data.success){
            route.push("/admin")
        }
    } catch (error) {
        
    }
 }


useEffect(()=>{
    getAdmin()
},[])

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4 sm:px-0">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-slate-200">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 bg-indigo-600 rounded-full text-white">
              <FaUserShield size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 uppercase">milling and millers</h1>
          <p className="text-sm text-slate-500">Sign in to access the dashboard</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Field */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <FaEnvelope />
            </div>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-700 placeholder-slate-400"
              placeholder="admin@company.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password Field */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <FaLock />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              required
              className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-700 placeholder-slate-400"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {/* Toggle Password Visibility */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-slate-600 cursor-pointer hover:text-slate-800">
              <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mr-2" />
              Remember me
            </label>
            <Link href="#" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-xs text-slate-400">
            &copy; 2024 Your Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;