"use client";
import NewsPageSkeleton from "@/app/components/NewsPageSkeleton ";
import { base_url, img_url } from "@/app/components/urls";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { 
  FaUser, 
  FaCalendarAlt, 
  FaClock, 
  FaEye, 
  FaArrowRight, 
  FaChevronLeft, 
  FaChevronRight 
} from "react-icons/fa";

const CategoryCompo = ({ slug, page, subcat, monthyear }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchArticals = async (filterPage) => {
    try {
      setLoading(true);
      
      // Build the filter string dynamically based on the current page state
      let filter = `page=${filterPage}`;
      if (subcat) filter += `&subcat=${subcat}`;
      if (monthyear) filter += `&monthyear=${monthyear}`;
      const querySlug = slug ? slug.split("-").join(" ") : "";
      
      const response = await axios.get(
        `${base_url}/articles/filter/${querySlug}?${filter}`
      );

      if (response.data && response.data.success) {
        setArticles(response.data.data);
        setTotalPages(response.data.totalPages); // Store total pages from API
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError("Failed to load articles.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if(page) setCurrentPage(page);
    fetchArticals(page || 1);
  }, [slug, page, subcat, monthyear]); 

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchArticals(newPage); 
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/400x250";
    return path.startsWith("http") ? path : `${img_url}${path}`; 
  };

  if (loading) {
    return (
       <NewsPageSkeleton />
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 capitalize">
          {slug?.split("-").join(" ") || "Latest News"}
        </h2>
        <div className="h-1 w-20 bg-blue-600 mt-2 rounded"></div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {articles.map((item) => (
          <Link
          href={`/articles/${item.slug}`}
            key={item._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full border border-gray-100"
          >
            <div className="relative h-48 overflow-hidden group">
              <img
                src={getImageUrl(item.image)}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                {item.subcategory?.name || item.category?.name}
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center text-gray-500 text-xs mb-3 space-x-4">
                <div className="flex items-center">
                  <FaUser className="mr-1.5 text-blue-500" />
                  <span className="truncate max-w-[100px]">{item.author}</span>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-1.5 text-blue-500" />
                  <span>{formatDate(item.createdAt)}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
                {item.title}
              </h3>

              <div className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                 {item.details?.[0]?.description?.replace(/<[^>]+>/g, '') || "No description available."}
              </div>

              <hr className="border-gray-100 my-4" />

              <div className="flex items-center justify-between text-gray-500 text-sm">
                <div className="flex space-x-4">
                    <div className="flex items-center">
                        <FaClock className="mr-1.5 text-gray-400" />
                        <span>{item.reading_time} min</span>
                    </div>
                </div>
                <button className="flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors group">
                  Read More
                  <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 flex items-center rounded-lg border transition-colors duration-200 
              ${currentPage === 1 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200" 
                : "bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300 border-gray-300"
              }`}
          >
            <FaChevronLeft className="mr-2" /> Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-200
                    ${currentPage === pageNum
                      ? "bg-blue-600 text-white border-blue-600 shadow-md transform scale-105"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 flex items-center rounded-lg border transition-colors duration-200
              ${currentPage === totalPages 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200" 
                : "bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300 border-gray-300"
              }`}
          >
            Next <FaChevronRight className="ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryCompo;