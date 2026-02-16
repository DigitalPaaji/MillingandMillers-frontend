"use client";

import React, { useEffect, useState } from "react";
import {
  FaTrash,
  FaImage,
  FaTag,
  FaClock,
  FaPenNib,
  FaSave,
  FaCloudUploadAlt,
  FaLayerGroup,
  FaUser,
  FaChevronLeft
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { base_url } from "@/app/components/urls";
import { toast } from "react-toastify";

const CreateArticlePage = () => {
  const router = useRouter();
  const [allInput, setAllInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [allSubCat, setSubCate] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  


  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      const tags = allInput.tags
        ? [...allInput.tags, currentTag.trim()]
        : [currentTag.trim()];
      setAllInput({ ...allInput, tags });
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setAllInput((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handelInput = (e) => {
    e.preventDefault();
    const valname = e.target.name;
    const val = e.target.value;

    if (valname === "category") {
      const newdata = allCategory.find((item) => item._id == val);
      setSubCate(newdata ? newdata.subcate : []);
      setAllInput({ ...allInput, subcategory: "", [valname]: val });
    } else {
      setAllInput({ ...allInput, [valname]: val });
    }
  };

  const handelImagead = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAllInput({ ...allInput, image: e.target.files[0] });
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${base_url}/category/get`);
      const data = await response.data;
      if (data.success) {
        setAllCategory(data.data);
      }
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    for (let key in allInput) {
      if (key === "tags") {
        allInput?.tags.forEach((item) => formData.append("rawTags", item));
      } else {
        formData.append(key, allInput[key]);
      }
    }

    try {
      const response = await axios.post(`${base_url}/articles/create`, formData);
      const data = await response.data;
   
      if (data.success) {
        toast.success(data.message)
router.push(`/admin/articles/details/${data.article._id}`)
      }
    } catch (error) {
              toast.error(error.message)

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors p-2 hover:bg-gray-100 rounded-lg"
            >
              <FaChevronLeft />
              <span className="font-medium">Back</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Article</h1>
              <p className="text-gray-500 text-sm mt-1">Draft and publish your content</p>
            </div>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Publishing...
              </>
            ) : (
              <>
                <FaSave />
                Publish Article
              </>
            )}
          </button>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Title Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-700 mb-2">
                  <FaPenNib className="text-blue-500" />
                  <label className="text-sm font-semibold">ARTICLE TITLE</label>
                </div>
                <input
                  name="title"
                  required
                  value={allInput.title || ""}
                  onChange={handelInput}
                  className="w-full text-3xl font-bold p-2 border-0 focus:ring-0 focus:outline-none placeholder-gray-400"
                  placeholder="Enter a compelling title..."
                />
                <div className="h-px bg-gradient-to-r from-blue-100 to-gray-100"></div>
              </div>
            </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <FaImage className="text-blue-500" />
                  Cover Image
                </h3>
              </div>
              <div className="p-6">
                <div className="relative group">
                  <input
                    type="file"
                    name="image"
                    id="coverImage"
                    hidden
                    accept="image/*"
                    onChange={handelImagead}
                  />
                  <label
                    htmlFor="coverImage"
                    className="block cursor-pointer"
                  >
                    <div className={`aspect-[16/9] w-full rounded-lg border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center overflow-hidden ${allInput.image
                        ? "border-blue-200 bg-blue-50"
                        : "border-gray-300 hover:border-blue-400 hover:bg-blue-50 group-hover:border-blue-400"
                      }`}
                    >
                      {allInput.image ? (
                        <div className="relative w-full h-full">
                          <img
                            src={URL.createObjectURL(allInput.image)}
                            className="w-full h-full object-cover"
                            alt="Cover preview"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                              <span className="text-sm font-medium text-gray-800">
                                Change image
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center p-6">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaCloudUploadAlt className="text-blue-500 text-xl" />
                          </div>
                          <p className="font-medium text-gray-700 mb-1">
                            Upload cover image
                          </p>
                          <p className="text-sm text-gray-500">
                            Drag & drop or click to browse
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            Recommended: 1200×630px
                          </p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>

          
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-8">
            
            {/* Article Settings Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <FaLayerGroup className="text-blue-500" />
                  Article Settings
                </h3>
              </div>
              <div className="p-6 space-y-6">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    onChange={handelInput}
                    value={allInput.category || ""}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  >
                    <option value="" disabled className="text-gray-400">
                      Select a category
                    </option>
                    {allCategory.map((item, index) => (
                      <option value={item._id} key={index} className="py-2">
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sub-Category
                  </label>
                  <select
                    name="subcategory"
                    onChange={handelInput}
                    value={allInput.subcategory || ""}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-50 disabled:text-gray-400"
                    disabled={!allInput.category}
                  >
                    <option value="" disabled className="text-gray-400">
                      {allInput.category ? "Select sub-category" : "Select category first"}
                    </option>
                    {allSubCat?.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      name="author"
                      value={allInput.author || ""}
                      onChange={handelInput}
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Enter author name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reading Time
                  </label>
                  <div className="relative">
                    <FaClock className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      name="reading_time"
                      type="number"
                      value={allInput.reading_time || ""}
                      onChange={handelInput}
                      min="1"
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Minutes"
                    />
                  </div>
                </div>
              </div>
            </div>

        
          

            {/* Tags Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <FaTag className="text-blue-500" />
                  Article Tags
                </h3>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Type a tag and press Enter"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Press Enter to add tags
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 min-h-[60px]">
                  {allInput.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-blue-400 hover:text-red-500 transition-colors"
                      >
                        <FaTrash size={12} />
                      </button>
                    </span>
                  ))}
                  {(!allInput.tags || allInput.tags.length === 0) && (
                    <div className="w-full text-center py-4 text-gray-400 text-sm">
                      No tags added yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateArticlePage;