"use client";
import RichEditor from "@/app/components/RichEditor";
import RichEditor2 from "@/app/components/RichEditor2";
import { base_url, img_url } from "@/app/components/urls";
import axios from "axios";
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  FiType,
  FiImage,
  FiUploadCloud,
  FiTrash2,
  FiSave,
  FiList,
  FiClock,
  FiEdit2,
  FiCheck,
  FiX,
  FiPlus,
  FiAlertCircle,
  FiChevronRight,
  FiMoreVertical,
} from "react-icons/fi";
import { toast } from "react-toastify";

const DetailCompo = ({ slug }) => {
  const [detail, setDetail] = useState({
    title: "",
    description: "",
    image: null,
    id: null,
  });
  const [allDetails, setAllDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);
  const [expandedSections, setExpandedSections] = useState({});

  // Fetch data
  const fetchDetails = useCallback(async () => {
    try {
      const response = await axios.get(
        `${base_url}/articles/alldetalse/${slug}`
      );
      const data = await response.data;
      if (data.success) {
        setAllDetails(data.details.details || []);
      }
    } catch (error) {
      console.error("Error fetching details", error);
      toast.error("Failed to load sections");
    }
  }, [slug]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  // Handle image changes
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setDetail((prev) => ({ ...prev, image: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setDetail((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setDetail({ title: "", description: "", image: null, id: null });
    setImagePreview(null);
    setIsEditing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEdit = (item) => {
    setDetail({
      title: item.title || "",
      description: item.description || "",
      image: null,
      id: item._id || item.id,
    });
    setImagePreview(item.image ? `${img_url}${item.image}` : null);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this section?")) return;

    try {
      const response = await axios.delete(
        `${base_url}/articles/details/${slug}/${id}`
      );
      const data = await response.data;

      if (data.success) {
        toast.success("Section deleted successfully");
        fetchDetails();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete section");
    }
  };

  const toggleExpand = (id) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const validateForm = () => {
    if (!detail.title.trim() && !detail.description.trim() && !detail.image) {
      toast.warning("Please fill at least one field");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setLoading(true);

    try {
      const formData = new FormData();
      if (detail.title.trim()) formData.append("title", detail.title.trim());
      if (detail.description.trim())
        formData.append("description", detail.description.trim());
      if (detail.image) formData.append("image", detail.image);
      if (detail.id) formData.append("id", detail.id);

      const url = isEditing
        ? `${base_url}/articles/details/${slug}/${detail.id}`
        : `${base_url}/articles/details/${slug}`;

      const method = isEditing ? "put" : "post";
      const response = await axios[method](url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = await response.data;

      if (data.success) {
        toast.success(data.message);
        resetForm();
        fetchDetails();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          `Failed to ${isEditing ? "update" : "create"} section`
      );
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return "Recently";
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString();
    } catch {
      return "Recently";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
       
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Article Sections
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Manage sections for article:{" "}
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
              {slug}
            </span>
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="sticky top-6 transition-all duration-300">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
              >                
                <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                        {isEditing ? "Edit Section" : "Create New Section"}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {isEditing
                          ? "Update existing section content"
                          : "Add a new section to your article"}
                      </p>
                    </div>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="self-start sm:self-center flex items-center gap-2 px-3 py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      >
                        <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" /> Add New
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-4 sm:p-6 lg:p-8 space-y-6">
               
             <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <FiType className="text-gray-400 w-4 h-4" /> Section Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Key Features, Methodology, Results..."
                      value={detail.title}
                      onChange={(e) =>
                        setDetail((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                    />
                  </div>

                  {/* Rich Text Editor */}
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <FiList className="text-gray-400 w-4 h-4" /> Content
                      </label>
                      <span className="text-xs text-gray-500">
                        Supports rich text formatting
                      </span>
                    </div>
                    <div className="border border-gray-300 rounded-lg overflow-hidden transition-all duration-200 hover:border-gray-400">
                      {/* <RichEditor
                        value={detail.description}
                        onChange={(html) =>
                          setDetail((prev) => ({
                            ...prev,
                            description: html,
                          }))
                        }
                      /> */}
                      
                      <RichEditor2    value={detail.description} 
                      
                      onChange={(html) =>
                          setDetail((prev) => ({
                            ...prev,
                            description: html,
                          }))
                        }
                      />
                      
                                        </div>
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <FiImage className="text-gray-400 w-4 h-4" /> Image
                      <span className="text-xs font-normal text-gray-500">
                        (Optional)
                      </span>
                    </label>

                    {!detail.image && !imagePreview ? (
                      <div className="relative">
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer group">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div className="flex flex-col items-center justify-center text-center space-y-3">
                            <div className="p-3 sm:p-4 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-200">
                              <FiUploadCloud className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                <span className="text-blue-600">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                PNG, JPG, GIF up to 5MB
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative group transition-all duration-200">
                        <div className="relative rounded-xl border border-gray-200 overflow-hidden w-full h-48 sm:h-64">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23f3f4f6'/%3E%3Ctext x='200' y='100' text-anchor='middle' dominant-baseline='middle' font-family='Arial' font-size='14' fill='%239ca3af'%3EImage preview%3C/text%3E%3C/svg%3E";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className="absolute bottom-3 right-3 flex gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  fileInputRef.current?.click()
                                }
                                className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-white transition-colors duration-200 shadow-lg"
                              >
                                <FiEdit2 className="w-3 h-3" /> Change
                              </button>
                              <button
                                type="button"
                                onClick={removeImage}
                                className="flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-700 transition-colors duration-200 shadow-lg"
                              >
                                <FiTrash2 className="w-3 h-3" /> Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Actions */}
                <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <FiAlertCircle className="w-4 h-4" />
                    <span>At least one field must be filled</span>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2 flex-1 sm:flex-none justify-center"
                    >
                      <FiX className="w-4 h-4" /> Clear
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-2 flex-1 sm:flex-none justify-center shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {isEditing ? "Updating..." : "Creating..."}
                        </>
                      ) : (
                        <>
                          {isEditing ? (
                            <>
                              <FiCheck className="w-4 h-4" /> Update Section
                            </>
                          ) : (
                            <>
                              <FiSave className="w-4 h-4" /> Save Section
                            </>
                          )}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE: PREVIEW LIST */}
          <div className="lg:col-span-5">
            <div className="sticky top-6">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {/* List Header */}
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900">
                        Existing Sections
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Click on any section to edit
                      </p>
                    </div>
                    <span className="self-start sm:self-center bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">
                      {allDetails.length} {allDetails.length === 1 ? "item" : "items"}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  {allDetails.length > 0 ? (
                    <div className="space-y-4 max-h-[500px] sm:max-h-[600px] overflow-y-auto pr-2">
                      {allDetails.map((item, index) => {
                        const itemId = item._id || item.id || index;
                        const isExpanded = expandedSections[itemId];
                        
                        return (
                          <div
                            key={itemId}
                            className={`group relative bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer ${
                              detail.id === itemId
                                ? "ring-2 ring-blue-500 border-blue-500"
                                : ""
                            }`}
                            onClick={() => handleEdit(item)}
                          >
                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-1 flex-1">
                                {item.title || (
                                  <span className="text-gray-400 italic">
                                    Untitled Section
                                  </span>
                                )}
                              </h4>
                              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded ml-2">
                                #{index + 1}
                              </span>
                            </div>

                            {/* Image Preview */}
                            {item.image && (
                              <div 
                                className="w-full h-28 sm:h-32 bg-gray-100 rounded-lg overflow-hidden mb-3 border border-gray-100 transition-transform duration-300 hover:scale-[1.02]"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleExpand(itemId);
                                }}
                              >
                                <img
                                  src={`${img_url}${item.image}`}
                                  alt="Section"
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23f3f4f6'/%3E%3Ctext x='200' y='100' text-anchor='middle' dominant-baseline='middle' font-family='Arial' font-size='14' fill='%239ca3af'%3EImage not available%3C/text%3E%3C/svg%3E";
                                  }}
                                />
                              </div>
                            )}

                            {/* Content Preview with expand/collapse */}
                            {item.description && (
                              <div className="mb-3">
                                <div 
                                  className={`prose prose-sm prose-gray max-w-none overflow-hidden transition-all duration-300 ${
                                    isExpanded ? '' : 'max-h-20'
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleExpand(itemId);
                                  }}
                                >
                                  <div 
                                    dangerouslySetInnerHTML={{
                                      __html: item.description,
                                    }}
                                  />
                                </div>
                                {item.description.length > 100 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleExpand(itemId);
                                    }}
                                    className="text-xs text-blue-600 hover:text-blue-800 font-medium mt-1 flex items-center gap-1 transition-colors duration-200"
                                  >
                                    {isExpanded ? 'Show less' : 'Read more'}
                                    <FiChevronRight className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                                  </button>
                                )}
                              </div>
                            )}

                            {/* Card Footer */}
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <FiClock className="w-3 h-3" />
                                <span>{formatTime(item.updatedAt || item.createdAt)}</span>
                              </div>
                              <div className="flex items-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(item);
                                  }}
                                  className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
                                  title="Edit"
                                >
                                  <FiEdit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={(e) => handleDelete(item._id || item.id, e)}
                                  className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                                  title="Delete"
                                >
                                  <FiTrash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 sm:py-12">
                      <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
                        <FiList className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-600 font-medium mb-1 text-sm sm:text-base">
                        No sections yet
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400">
                        Create your first section using the form
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCompo;