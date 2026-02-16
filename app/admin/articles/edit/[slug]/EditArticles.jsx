"use client"
import { base_url, img_url } from '@/app/components/urls';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { FaSave, FaArrowLeft, FaHeading, FaUser, FaTag, FaClock, FaImage } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { MdCancel, MdOutlineCloudUpload } from "react-icons/md";
import { useRouter } from 'next/navigation';


const EditArticles = ({ slug }) => {
  const [allDetails, setAllDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [newTagInput, setNewTagInput] = useState("");
  const route= useRouter()
  const fetchDetails = useCallback(async () => {
    try {
      const response = await axios.get(`${base_url}/articles/articlesingle/${slug}`);
      if (response.data.success) {
        setAllDetails(response.data.details);
      }
    } catch (error) {
      toast.error("Failed to load article");
    }
  }, [slug]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAllDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (!newTagInput.trim()) return;
    if (allDetails.tags.includes(newTagInput.trim())) {
      return toast.warning("Tag already exists");
    }
    setAllDetails(prev => ({ ...prev, tags: [...prev.tags, newTagInput.trim()] }));
    setNewTagInput("");
  };

  const removeTag = (tagIndex) => {
    setAllDetails(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== tagIndex)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    
    formData.append('title', allDetails.title);
    formData.append('author', allDetails.author);
    formData.append('reading_time', allDetails.reading_time);
    formData.append('tags', JSON.stringify(allDetails.tags)); 
    
    if (newImage) {
      formData.append('newimage', newImage);
    } 

    try {
      const response = await axios.put(
        `${base_url}/articles/update/${allDetails._id}`, 
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } } // Required for files
      );


      if (response.data.success) {

        toast.success("Article updated successfully!");
        route.push("/admin/articles/")
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!allDetails) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className=" mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        
        {/* Sticky Header */}
        <div className="flex items-center justify-between p-6 border-b bg-white sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
              <FaArrowLeft />
            </button>
            <h2 className="text-xl font-bold text-gray-800">Edit Article Details</h2>
          </div>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-xl font-bold transition-all disabled:bg-gray-400 shadow-lg shadow-indigo-200"
          >
            <FaSave /> {loading ? "Updating..." : "Save Changes"}
          </button>
        </div>

        <form className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Column: Basic Info */}
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                <FaHeading className="text-indigo-500" /> Article Title
              </label>
              <input
                type="text"
                name="title"
                value={allDetails.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                  <FaUser className="text-indigo-500" /> Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={allDetails.author}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                  <FaClock className="text-indigo-500" /> Read Time
                </label>
                <input
                  type="number"
                  name="reading_time"
                  value={allDetails.reading_time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* Tags Section */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                <FaTag className="text-indigo-500" /> Management Tags
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTagInput}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Type and press Enter..."
                />
                <button 
                  type="button"
                  onClick={handleAddTag}
                  className="bg-emerald-600 text-white px-5 rounded-xl font-medium hover:bg-emerald-700 transition-colors"
                >
                  Add
                </button>
              </div>

              <div className='flex gap-2 flex-wrap mt-4'>
                {allDetails.tags?.map((item, index) => (
                  <div key={index} className='flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-sm font-medium border border-indigo-100'>
                    {item}
                    <MdCancel 
                      onClick={() => removeTag(index)} 
                      className='cursor-pointer text-indigo-300 hover:text-red-500 transition-colors' 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Image Upload */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
              <FaImage className="text-indigo-500" /> Featured Image
            </label>
            
            <div className="relative group rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 h-80 flex justify-center items-center">
              {/* Display Logic */}
              <img 
                src={newImage ? URL.createObjectURL(newImage) : `${img_url}${allDetails.image}`} 
                className="w-full h-full object-cover" 
                alt="Preview" 
              />

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-white cursor-pointer">
                <label htmlFor="newImage" className="cursor-pointer flex flex-col items-center">
                  <MdOutlineCloudUpload className="text-5xl mb-2" />
                  <span className="font-semibold text-sm">Click to Change Image</span>
                </label>
              </div>
              
              {newImage && (
                <button 
                  type="button"
                  onClick={() => setNewImage(null)}
                  className="absolute top-4 right-4 bg-white/90 p-1 rounded-full text-red-600 shadow-md hover:bg-red-50"
                >
                  <MdCancel size={24} />
                </button>
              )}
            </div>
            <input 
              type="file" 
              accept='image/*' 
              id="newImage" 
              hidden 
              onChange={(e) => setNewImage(e.target.files[0])} 
            />
            <p className="text-xs text-gray-400 text-center italic">Best size: 1200x800px. Formats: JPG, PNG, WEBP</p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditArticles;