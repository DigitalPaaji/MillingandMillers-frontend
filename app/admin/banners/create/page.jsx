"use client"
import { base_url } from '@/app/components/urls';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FiUpload, FiSmartphone, FiMonitor, FiSave, FiX, FiImage, FiEdit2, FiType } from 'react-icons/fi';
import { toast } from 'react-toastify';

const BannerCreationPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: '', // Default to empty string for text input
    mobileImage: null,
    desktopImage: null,
    mobilePreview: null,
    desktopPreview: null
  });
  const route = useRouter()

  // Pre-defined suggestions for the datalist (optional helper)
  const typeSuggestions = [
    'Homepage Banner',
    'Category Banner',
    'Product Sidebar',
    'Promotional Popup',
    'Seasonal Sale'
  ];

  const handleImageUpload = (e, imageType) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        [imageType === 'mobile' ? 'mobileImage' : 'desktopImage']: file,
        [imageType === 'mobile' ? 'mobilePreview' : 'desktopPreview']: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (imageType) => {
    setFormData(prev => ({
      ...prev,
      [imageType === 'mobile' ? 'mobileImage' : 'desktopImage']: null,
      [imageType === 'mobile' ? 'mobilePreview' : 'desktopPreview']: null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.mobileImage || !formData.desktopImage) {
      alert('Please upload both mobile and desktop images');
      return;
    }
    if (!formData.title.trim() || !formData.type.trim()) {
      alert('Please fill in all text fields');
      return;
    }

    // Prepare FormData to match Mongoose Schema
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('type', formData.type);
    submitData.append('mobile_image', formData.mobileImage);
    submitData.append('desktop_image', formData.desktopImage);

    try {
const response = await axios.post(`${base_url}/banner/create`,submitData);
const data = await response.data;
   if(data.success){
     setFormData({
        title: '',
        type: '',
        mobileImage: null,
        desktopImage: null,
        mobilePreview: null,
        desktopPreview: null
      });
    toast.success(data.message)
    route.push("/admin/banners")
}else{
       toast.error(data.message)
       
    }
    
    
} catch (error) {

    toast.error(error.message)
     
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Create New Banner</h1>
          <p className="text-slate-500 mt-2">Configure banner details and upload responsive assets.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          <div className="p-6 md:p-8 space-y-8">
            
            {/* Text Inputs Section */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Title Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <FiType className="text-blue-500" />
                  Banner Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. Summer Sale 2024"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                  required
                />
              </div>

              {/* Type Input (Changed from Buttons to Text Input) */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <FiType className="text-purple-500" />
                  Banner Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  list="type-suggestions" // Connects to datalist below
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  placeholder="e.g. Homepage or promotional"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                  required
                />
                {/* Datalist for suggestions */}
                <datalist id="type-suggestions">
                  {typeSuggestions.map((suggestion, index) => (
                    <option key={index} value={suggestion} />
                  ))}
                </datalist>
                <p className="text-xs text-slate-400">Type a custom category or choose a suggestion.</p>
              </div>
            </div>

            <div className="h-px bg-slate-100 my-6"></div>

            {/* Desktop Image Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <FiMonitor size={20} />
                  </div>
                  Desktop Image <span className="text-red-500">*</span>
                </label>
                <span className="text-xs font-medium bg-slate-100 text-slate-500 px-3 py-1 rounded-full border border-slate-200">
                  1920 x 600px Recommended
                </span>
              </div>

              {formData.desktopPreview ? (
                <div className="relative group border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                   <img 
                     src={formData.desktopPreview} 
                     alt="Desktop Preview" 
                     className="w-full h-48 md:h-64 object-cover"
                   />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button
                        type="button" 
                        onClick={() => document.getElementById('desktop-upload').click()}
                        className="p-3 bg-white text-slate-800 rounded-full hover:bg-slate-100 transition shadow-lg"
                        title="Change Image"
                      >
                        <FiEdit2 size={20} />
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleRemoveImage('desktop')}
                        className="p-3 bg-white text-red-500 rounded-full hover:bg-red-50 transition shadow-lg"
                        title="Remove Image"
                      >
                        <FiX size={20} />
                      </button>
                   </div>
                   <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                      {formData.desktopImage.name} ({(formData.desktopImage.size / 1024 / 1024).toFixed(2)} MB)
                   </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-blue-50/50 hover:border-blue-400 transition-all group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiUpload className="w-10 h-10 text-slate-400 group-hover:text-blue-500 mb-3 transition-colors" />
                    <p className="mb-2 text-sm text-slate-500"><span className="font-semibold text-slate-700">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-slate-400">SVG, PNG, JPG or GIF (MAX. 5MB)</p>
                  </div>
                  <input 
                    id="desktop-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'desktop')}
                  />
                </label>
              )}
            </div>

            {/* Mobile Image Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <FiSmartphone size={20} />
                  </div>
                  Mobile Image <span className="text-red-500">*</span>
                </label>
                <span className="text-xs font-medium bg-slate-100 text-slate-500 px-3 py-1 rounded-full border border-slate-200">
                  768 x 400px Recommended
                </span>
              </div>

              {formData.mobilePreview ? (
                <div className="flex justify-center md:justify-start bg-slate-50 border border-slate-200 rounded-xl p-6">
                   <div className="relative group w-48 border-4 border-slate-800 rounded-[2rem] overflow-hidden shadow-xl bg-white">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-800 rounded-b-xl z-10"></div>
                      <img 
                        src={formData.mobilePreview} 
                        alt="Mobile Preview" 
                        className="w-full h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <button
                            type="button" 
                            onClick={() => document.getElementById('mobile-upload').click()}
                            className="p-2 bg-white text-slate-800 rounded-full hover:bg-slate-100 transition shadow-lg"
                          >
                            <FiEdit2 size={16} />
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleRemoveImage('mobile')}
                            className="p-2 bg-white text-red-500 rounded-full hover:bg-red-50 transition shadow-lg"
                          >
                            <FiX size={16} />
                          </button>
                      </div>
                   </div>
                   <div className="ml-6 flex flex-col justify-center">
                      <p className="font-medium text-slate-700">{formData.mobileImage.name}</p>
                      <p className="text-sm text-slate-500 mb-2">{(formData.mobileImage.size / 1024 / 1024).toFixed(2)} MB</p>
                      <p className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded inline-block w-fit">Ready to upload</p>
                   </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-purple-50/50 hover:border-purple-400 transition-all group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiUpload className="w-10 h-10 text-slate-400 group-hover:text-purple-500 mb-3 transition-colors" />
                    <p className="mb-2 text-sm text-slate-500"><span className="font-semibold text-slate-700">Click to upload</span> mobile version</p>
                  </div>
                  <input 
                    id="mobile-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'mobile')}
                  />
                </label>
              )}
            </div>

          </div>

          {/* Footer Actions */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col-reverse md:flex-row gap-3 md:justify-end">
            <button
              type="button"
              onClick={() => setFormData({ title: '', type: '', mobileImage: null, desktopImage: null, mobilePreview: null, desktopPreview: null })}
              className="px-6 py-2.5 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors"
            >
              Reset Form
            </button>
            <button
              type="submit"
              disabled={!formData.mobileImage || !formData.desktopImage || !formData.title || !formData.type}
              className="flex items-center justify-center gap-2 px-8 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow"
            >
              <FiSave className="w-5 h-5" />
              Save Banner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerCreationPage;