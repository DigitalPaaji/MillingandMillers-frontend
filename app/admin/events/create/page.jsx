"use client";
import { base_url } from "@/app/components/urls";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Page = () => {

  const route = useRouter()
    const [inputinfo, setInputInfo] = useState({
    event: "",
    event_date: "",
    url: "",
    image: null,
    tag:"",
    location:"",
    dis:"",
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
     const formData = new FormData();

  formData.append("event", inputinfo.event);
  formData.append("event_date", inputinfo.event_date);
  formData.append("url", inputinfo.url);
  formData.append("tag", inputinfo.tag);
  formData.append("location", inputinfo.location);
  formData.append("dis", inputinfo.dis);

  if (inputinfo.image) {
    formData.append("image", inputinfo.image);
  }

try {
    const response = await axios.post(`${base_url}/events/create`,formData)
    const data = await response.data;
    if(data.success){
        toast.success(data.message)
        route.push("/admin/events")
        
    }
} catch (error) {
    toast.error(error.response.data.message)
}

  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create Event
        </h2>

        {/* Event Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Annual Tech Conference"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={inputinfo.event}
            onChange={(e) =>
              setInputInfo((prev) => ({ ...prev, event: e.target.value }))
            }
          />
        </div>

        {/* Date Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Date
          </label>
          <input
            type="date"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={inputinfo.event_date}
            onChange={(e) =>
              setInputInfo((prev) => ({ ...prev, event_date: e.target.value }))
            }
          />
        </div>
   <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Tag
          </label>
          <input
            type="text"
            placeholder="event tag"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={inputinfo.tag}
            onChange={(e) =>
              setInputInfo((prev) => ({ ...prev, tag: e.target.value }))
            }
          />
        </div>
        {/* URL Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event URL
          </label>
          <input
            type="url"
            placeholder="https://example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={inputinfo.url}
            onChange={(e) =>
              setInputInfo((prev) => ({ ...prev, url: e.target.value }))
            }
          />
        </div>


  <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event location
          </label>
          <input
            type="text"
            placeholder="event location"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={inputinfo.location}
            onChange={(e) =>
              setInputInfo((prev) => ({ ...prev, location: e.target.value }))
            }
          />
        </div>
  <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Description
          </label>
          <input
            type="text"
            placeholder="event description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={inputinfo.dis}
            onChange={(e) =>
              setInputInfo((prev) => ({ ...prev, dis: e.target.value }))
            }
          />
        </div>
        {/* File Upload Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Banner
          </label>
          
          <label
            htmlFor="image"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FaCloudUploadAlt className="text-4xl text-blue-500 mb-2" />
              <p className="text-sm text-gray-500">
                {inputinfo.image ? (
                  <span className="text-green-600 font-medium">
                    {inputinfo.image.name}
                  </span>
                ) : (
                  <>
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </>
                )}
              </p>
            </div>
            
            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setInputInfo((prev) => ({ ...prev, image: e.target.files[0] }))
              }
            />
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md active:scale-[0.98]"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default Page;