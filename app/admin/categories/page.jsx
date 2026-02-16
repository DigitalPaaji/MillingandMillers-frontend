"use client";
import { base_url } from "@/app/components/urls";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FiEdit3,
  FiTrash2,
  FiPlus,
  FiX,
  FiCheck,
  FiLayers,
  FiGrid,
  FiCommand,
  FiCornerDownRight,
  FiLoader
} from "react-icons/fi";

const Page = () => {
  // --- STATE (Identical logic) ---
  const [categoryInput, setCategoryinput] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [subCategorycat, setSubCategorycat] = useState("");
  const [subcateInput, setSubCatInput] = useState("");
  const [allSubCategory, setAllSubcategory] = useState([]);
  const [loading, setLoading] = useState({
    categories: false,
    subcategories: false,
    addingCategory: false,
    addingSubcategory: false,
  });
  const [editing, setEditing] = useState({
    type: null,
    id: null,
    value: "",
  });

  // --- HANDLERS (Identical logic) ---
  const handleAddCategory = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!categoryInput.trim()) {
        toast.error("Please enter a category name");
        return;
      }
      setLoading((prev) => ({ ...prev, addingCategory: true }));
      try {
        const response = await axios.post(`${base_url}/category/create`, {
          name: categoryInput,
        });
        const data = await response.data;
        if (data.success) {
          setAllCategory([...allCategory, data.newCategory]);
          toast.success(data.message);
          setCategoryinput("");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading((prev) => ({ ...prev, addingCategory: false }));
      }
    }
  };

  const handleAddSubCategory = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!subcateInput.trim()) {
        toast.error("Please enter a subcategory name");
        return;
      }
      if (!subCategorycat) {
        toast.error("Please select a category first");
        return;
      }
      setLoading((prev) => ({ ...prev, addingSubcategory: true }));
      try {
        const response = await axios.post(`${base_url}/category/sub/create`, {
          categoryId: subCategorycat,
          subcategory: subcateInput.trim(),
        });
        const data = await response.data;
        if (data.success) {
          toast.success(data.message);
          setSubCatInput("");
          setAllSubcategory([...allSubCategory, data.data]);
          setAllCategory((prev) =>
            prev.map((cat) =>
              cat._id === subCategorycat
                ? { ...cat, subcate: [...cat.subcate, data.data] }
                : cat
            )
          );
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading((prev) => ({ ...prev, addingSubcategory: false }));
      }
    }
  };

  const getAllCategory = async () => {
    setLoading((prev) => ({ ...prev, categories: true }));
    try {
      const response = await axios.get(`${base_url}/category/get`);
      const data = await response.data;
      if (data.success) setAllCategory(data.data);
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setLoading((prev) => ({ ...prev, categories: false }));
    }
  };

  const getAllSubcategory = async () => {
    setLoading((prev) => ({ ...prev, subcategories: true }));
    try {
      const response = await axios.get(`${base_url}/category/sub/get`);
      const data = await response.data;
      if (data.success) setAllSubcategory(data.data);
    } catch (error) {
      setAllSubcategory([]);
    } finally {
      setLoading((prev) => ({ ...prev, subcategories: false }));
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Delete this ${type}?`)) return;
    try {
      const endpoint =
        type === "category"
          ? `${base_url}/category/delete/${id}`
          : `${base_url}/category/sub/delete/${id}`;
      const response = await axios.delete(endpoint);
      const data = await response.data;
      if (data.success) {
        toast.success(data.message);
        if (type === "category") {
          setAllCategory((prev) => prev.filter((item) => item._id !== id));
          setAllSubcategory((prev) =>
            prev.filter((item) => item.category !== id)
          );
        } else {
          setAllSubcategory((prev) => prev.filter((item) => item._id !== id));
          const parentCat = allSubCategory.find(
            (sub) => sub._id === id
          )?.category;
          if (parentCat) {
            setAllCategory((prev) =>
              prev.map((cat) =>
                cat._id === parentCat
                  ? {
                      ...cat,
                      subcate: cat.subcate.filter((sub) => sub._id !== id),
                    }
                  : cat
              )
            );
          }
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const startEdit = (type, id, currentValue) => {
    setEditing({ type, id, value: currentValue });
  };

  const handleEdit = async () => {
    if (!editing.value.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    try {
      const endpoint =
        editing.type === "category"
          ? `${base_url}/category/update/${editing.id}`
          : `${base_url}/category/sub/update/${editing.id}`;
      const response = await axios.put(endpoint, { name: editing.value });
      const data = await response.data;
      if (data.success) {
        toast.success(data.message);
        if (editing.type === "category") {
          setAllCategory((prev) =>
            prev.map((item) =>
              item._id === editing.id ? { ...item, name: editing.value } : item
            )
          );
        } else {
          setAllSubcategory((prev) =>
            prev.map((item) =>
              item._id === editing.id ? { ...item, name: editing.value } : item
            )
          );
        }
        setEditing({ type: null, id: null, value: "" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllSubcategory();
  }, []);

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Taxonomy Manager
            </h1>
            <p className="text-gray-600 mt-2 text-base font-medium">
              Manage your categories and subcategories
            </p>
          </div>

          <div className="flex gap-4">
            <StatCard 
              label="Categories" 
              value={allCategory.length} 
              icon={<FiLayers size={24} />} 
              color="text-blue-700" 
              bg="bg-blue-100" 
            />
            <StatCard 
              label="Sub-Cats" 
              value={allSubCategory.length} 
              icon={<FiGrid size={24} />} 
              color="text-purple-700" 
              bg="bg-purple-100" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[750px]">
          
          {/* ==================== LEFT COLUMN: CATEGORIES ==================== */}
          <div className="lg:col-span-5 flex flex-col bg-white rounded-2xl shadow-md border border-gray-300 overflow-hidden">
            {/* Column Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3 bg-gray-50">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                <FiCommand size={20} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Categories</h2>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-b border-gray-200">
              <div className="relative group">
                <input
                  type="text"
                  className="w-full pl-4 pr-12 py-3 bg-white border-2 border-gray-300 rounded-lg text-base font-medium text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-500"
                  placeholder="Type new category..."
                  value={categoryInput}
                  onChange={(e) => setCategoryinput(e.target.value)}
                  onKeyDown={handleAddCategory}
                  disabled={loading.addingCategory}
                />
                <div className="absolute right-3 top-3 text-gray-500">
                  {loading.addingCategory ? (
                    <FiLoader className="animate-spin" size={20}/>
                  ) : (
                    <div className="bg-gray-200 px-2 py-1 rounded text-xs font-bold text-gray-700">ENTER</div>
                  )}
                </div>
              </div>
            </div>

            {/* List Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {loading.categories ? (
                <LoadingSkeleton />
              ) : allCategory.length > 0 ? (
                allCategory.map((item) => (
                  <div
                    key={item._id}
                    className="group relative flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex-1 min-w-0">
                      {editing.type === "category" && editing.id === item._id ? (
                        <EditInput 
                          value={editing.value}
                          onChange={(e) => setEditing((prev) => ({ ...prev, value: e.target.value }))}
                          onSave={handleEdit}
                          onCancel={() => setEditing({ type: null, id: null, value: "" })}
                        />
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"></div>
                          <span className="font-bold text-gray-800 text-base truncate">{item.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 pl-3">
                      <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2.5 py-1 rounded-full border border-blue-200">
                        {item.subcate?.length || 0}
                      </span>
                      <ActionButtons 
                        onEdit={() => startEdit("category", item._id, item.name)}
                        onDelete={() => handleDelete("category", item._id)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState label="No categories created yet." />
              )}
            </div>
          </div>

          {/* ==================== RIGHT COLUMN: SUBCATEGORIES ==================== */}
          <div className="lg:col-span-7 flex flex-col bg-white rounded-2xl shadow-md border border-gray-300 overflow-hidden">
             {/* Column Header */}
             <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3 bg-gray-50">
              <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
                <FiCornerDownRight size={20} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Sub Categories</h2>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-b border-gray-200 flex flex-col sm:flex-row gap-4">
               <div className="sm:w-1/3">
                 <select
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-sm font-medium text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none cursor-pointer"
                    onChange={(e) => setSubCategorycat(e.target.value)}
                    value={subCategorycat}
                  >
                    <option value="" disabled className="text-gray-500">Select Parent...</option>
                    {allCategory.map((item) => (
                      <option key={item._id} value={item._id}>{item.name}</option>
                    ))}
                  </select>
               </div>
               <div className="sm:w-2/3 relative">
                  <input
                    type="text"
                    className="w-full pl-4 pr-12 py-3 bg-white border-2 border-gray-300 rounded-lg text-base font-medium text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all placeholder:text-gray-500 disabled:bg-gray-100 disabled:text-gray-400"
                    placeholder={subCategorycat ? "Type subcategory name..." : "Select parent first ->"}
                    value={subcateInput}
                    onChange={(e) => setSubCatInput(e.target.value)}
                    onKeyDown={handleAddSubCategory}
                    disabled={!subCategorycat || loading.addingSubcategory}
                  />
                  <div className="absolute right-3 top-3 text-gray-500">
                    {loading.addingSubcategory ? (
                      <FiLoader className="animate-spin" size={20}/>
                    ) : (
                      <FiPlus size={22} className={!subCategorycat ? "opacity-30" : "text-purple-600"}/>
                    )}
                  </div>
               </div>
            </div>

            {/* List Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {loading.subcategories ? (
                <LoadingSkeleton />
              ) : allSubCategory.length > 0 ? (
                allSubCategory.map((item) => (
                  <div
                    key={item._id}
                    className="group relative flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-purple-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex-1 min-w-0">
                      {editing.type === "subcategory" && editing.id === item._id ? (
                        <EditInput 
                          value={editing.value}
                          onChange={(e) => setEditing((prev) => ({ ...prev, value: e.target.value }))}
                          onSave={handleEdit}
                          onCancel={() => setEditing({ type: null, id: null, value: "" })}
                          color="purple"
                        />
                      ) : (
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-800 text-base truncate">{item.name}</span>
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1 mt-1">
                             <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                             Parent: {allCategory.find((cat) => cat._id === item.category)?.name || "Unknown"}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center pl-3">
                      <ActionButtons 
                        onEdit={() => startEdit("subcategory", item._id, item.name)}
                        onDelete={() => handleDelete("subcategory", item._id)}
                        hoverColor="text-purple-700"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState label="No subcategories created yet." />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUBCOMPONENTS FOR CLEANER CODE ---

const StatCard = ({ label, value, icon, color, bg }) => (
  <div className="bg-white px-6 py-4 rounded-xl shadow-md border border-gray-200 flex items-center gap-4">
    <div className={`p-3 rounded-lg ${bg} ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-extrabold text-gray-900 leading-none">{value}</p>
    </div>
  </div>
);

const ActionButtons = ({ onEdit, onDelete, hoverColor = "text-blue-700" }) => (
  <div className="flex items-center gap-2">
    <button onClick={onEdit} className={`p-2 text-gray-500 hover:${hoverColor} hover:bg-gray-100 rounded-lg transition-colors border border-transparent hover:border-gray-200`} title="Edit">
      <FiEdit3 size={18} />
    </button>
    <button onClick={onDelete} className="p-2 text-gray-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100" title="Delete">
      <FiTrash2 size={18} />
    </button>
  </div>
);

const EditInput = ({ value, onChange, onSave, onCancel, color = "blue" }) => (
  <div className="flex items-center gap-2 w-full animate-in fade-in zoom-in duration-200">
    <input
      autoFocus
      type="text"
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 bg-white border-2 border-${color}-300 rounded-lg focus:border-${color}-600 focus:outline-none text-base font-medium text-gray-900`}
    />
    <button onClick={onSave} className="p-2 text-green-700 bg-green-100 hover:bg-green-200 rounded-lg border border-green-300">
      <FiCheck size={18} />
    </button>
    <button onClick={onCancel} className="p-2 text-red-700 bg-red-100 hover:bg-red-200 rounded-lg border border-red-300">
      <FiX size={18} />
    </button>
  </div>
);

const EmptyState = ({ label }) => (
  <div className="flex flex-col items-center justify-center h-48 text-gray-400 border-2 border-dashed border-gray-300 rounded-xl m-2 bg-gray-50">
    <FiLayers size={32} className="mb-3 opacity-50" />
    <p className="text-sm font-semibold text-gray-500">{label}</p>
  </div>
);

const LoadingSkeleton = () => (
  <div className="space-y-4 p-2">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse border border-gray-200"></div>
    ))}
  </div>
);

export default Page;