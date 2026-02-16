"use client";

import { base_url } from "@/app/components/urls";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt, FaLink, FaLayerGroup, FaTrash } from "react-icons/fa";
import { MdOutlineSave } from "react-icons/md";
import { toast } from "react-toastify";

const AddItemPage = () => {
  const [formData, setFormData] = useState({
    link: "",
    image: "",
  });


  const [loading, setLoading] = useState(false);
 const route = useRouter()
   
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
   
setFormData(prev=>({...prev,image:file}))


  
  };

 


  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (!formData.link) {
      toast.error("Website URL is required");
      return;
    }

    if (!formData.image) {
      toast.error("image is required");
      return;
    }

    setLoading(true);

    const payload = new FormData();
   for(let key in formData){
    payload.append([key],formData[key])
   }

    try {
      const { data } = await axios.post(
        `${base_url}/compaines/create`,
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data.success) {
        toast.success(data.message);
      
        setFormData({ link: "", image: "" });
        route.push("/admin/companies")
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">

        <div className="bg-indigo-600 p-5 text-center">
          <h2 className="text-white text-xl font-bold">Add New Product</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              1. Upload Image <span className="text-red-500">*</span>
            </label>

            <label className={`flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed
              ${formData?.image ? "border-green-500 bg-green-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}>
              <FaCloudUploadAlt className={`mb-2 text-2xl ${formData?.image ? "text-green-500" : "text-gray-400"}`} />
              <span className="text-xs text-gray-500">
                {formData?.image ? formData?.image.name : "Click to upload"}
              </span>
              <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            </label>
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              2. Website URL <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaLink className="absolute left-3 top-3 text-gray-400" />
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={(e)=>setFormData(prev=>({...prev,link:e.target.value}))}
                required
                placeholder="https://example.com"
                className="w-full pl-10 py-2.5 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>

          {/* Preview */}
          {formData?.image && (
            <div className="relative h-40 rounded-lg overflow-hidden border">
              <img src={URL.createObjectURL(formData.image)} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={()=>setFormData(prev=>({...prev,image:""}))}
                className="absolute top-2 right-2 bg-white p-2 rounded-full text-red-500 shadow">
                <FaTrash size={14} />
              </button>
            </div>
          )}


          {/* Submit */}
          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:bg-gray-400">
            {loading ? "Saving..." : <><MdOutlineSave /> Save Product</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItemPage;
