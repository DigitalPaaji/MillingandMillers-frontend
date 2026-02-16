"use client";
import { base_url, img_url } from "@/app/components/urls";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaEye,
  FaTrash,
  FaClock,
  FaChevronLeft,
  FaChevronRight,
  FaPencilAlt,
  FaCogs,
} from "react-icons/fa";

const ArticalCompo = ({ page: initialPage = 1 }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);



  const getArticles = async (pageNumber) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${base_url}/articles/getarticles?page=${pageNumber}`,
      );
      const result = response.data;

      if (result.success) {
        setArticles(result.data);
        setTotalPages(result.totalPages);
        setCurrentPage(result.page);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticles(currentPage);
  }, [currentPage]);

 





 

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };


  const handleDelete = async (articleId) => {
    if (!window.confirm("Are you sure you want to delete this article?"))
      return;

    try {
      const response = await axios.delete(
        `${base_url}/articles/deletearticle`,
        {
          data: { _id: articleId },
        },
      );

      if (response.data.success) {
        getArticles(currentPage);
        alert("Article deleted successfully!");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete article");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Articles List</h2>
        <span className="text-sm text-gray-500">Total Pages: {totalPages}</span>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Stats
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-10">
                  Loading...
                </td>
              </tr>
            ) : (
              articles.map((article) => (
                <tr
                  key={article._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <img
                      src={`${img_url}${article.image}`}
                      alt={article.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {article.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      By: {article.author}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-gray-600 text-xs">
                      <span className="flex items-center gap-2">
                        <FaEye /> {article.views || 0} views
                      </span>
                      <span className="flex items-center gap-2">
                        <FaClock /> {article.reading_time || 0} min read
                      </span>
                      <span className="text-xs text-gray-500">
                        {Array.isArray(article.tags)
                          ? article.tags.join(", ")
                          : ""}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-3 items-center">
                      {/* Quick Edit Button */}
                      <Link
                        href={`/admin/articles/details/${article._id}`}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md border border-blue-200 transition-colors"
                        title="Quick Edit (Basic Fields)"
                      >
                        <FaPencilAlt size={14} />
                        <span className="text-xs font-medium">Quick Edit</span>
                      </Link>

                      {/* Advanced Edit Button */}
                      <Link
                        href={`/admin/articles/edit/${article._id}`}
                        className="flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-md border border-indigo-200 transition-colors"
                        title="Advanced Edit (All Fields)"
                      >
                        <FaCogs size={14} />
                        <span className="text-xs font-medium">Advanced</span>
                      </Link>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(article._id)}
                        className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md"
                        title="Delete Article"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 px-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaChevronLeft className="mr-2" /> Previous
        </button>

        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 text-sm font-medium rounded-md border ${
                currentPage === index + 1
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next <FaChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ArticalCompo;
