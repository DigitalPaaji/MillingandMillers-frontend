"use client"

import axios from 'axios'
import React, { useEffect, useState, useMemo } from 'react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell
} from 'recharts'
import { 
  FaEye, FaClock, FaFileAlt, FaChartPie, FaSpinner, FaLayerGroup 
} from 'react-icons/fa'
import { base_url } from '../components/urls'

// Color palette for the Pie Chart slices
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AnalyticsDashboard = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/banner/getchartdata`);
      const result = response.data?.data || [];
      setArticles(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load analytics data.");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  // ---------------------------------------------------------
  // DATA PROCESSING: Aggregate by Article & Category
  // ---------------------------------------------------------
  const { chartData, categoryData, stats } = useMemo(() => {
    if (!articles.length) return { chartData: [], categoryData: [], stats: { totalViews: 0, totalReadingTime: 0 } };

    let totalViews = 0;
    let totalReadingTime = 0;
    
    // 1. Process Article List (Existing)
    const formattedArticles = articles.map((item, index) => {
      totalViews += item.views || 0;
      totalReadingTime += item.reading_time || 0;
      return {
        shortName: `Art. ${index + 1}`,
        title: item.title || `Article ${index + 1}`,
        reading_time: item.reading_time,
        views: item.views,
        category: item.category?.name || "Uncategorized"
      };
    });

    // 2. Process Category Grouping (New!)
    const catMap = {};

    articles.forEach((item) => {
      const catName = item.category?.name || "Uncategorized";
      
      if (!catMap[catName]) {
        catMap[catName] = { 
          name: catName, 
          count: 0, 
          totalViews: 0, 
          totalReadingTime: 0 
        };
      }
      
      catMap[catName].count += 1;
      catMap[catName].totalViews += (item.views || 0);
      catMap[catName].totalReadingTime += (item.reading_time || 0);
    });

    // Convert Map to Array and calculate averages
    const formattedCategories = Object.values(catMap).map(cat => ({
      ...cat,
      avgReadingTime: Math.round(cat.totalReadingTime / cat.count)
    }));

    return {
      chartData: formattedArticles,
      categoryData: formattedCategories,
      stats: {
        totalViews,
        totalArticles: articles.length,
        totalReadingTime,
        avgReadingTime: Math.round(totalReadingTime / articles.length) || 0
      }
    };
  }, [articles]);

  if (loading) return <LoadingState />;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Header */}
        <div className="flex flex-col gap-1 border-b border-gray-200 pb-5">
          <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
          <p className="text-gray-500">Real-time performance metrics</p>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard title="Total Articles" value={stats.totalArticles} icon={<FaFileAlt />} color="bg-blue-100 text-blue-600" />
          <KPICard title="Total Views" value={stats.totalViews} icon={<FaEye />} color="bg-green-100 text-green-600" />
          <KPICard title="Avg Reading Time" value={`${stats.avgReadingTime} min`} icon={<FaClock />} color="bg-purple-100 text-purple-600" />
          <KPICard title="Active Categories" value={categoryData.length} icon={<FaLayerGroup />} color="bg-orange-100 text-orange-600" />
        </div>

        {/* ------------------------------------------------------ */}
        {/* SECTION: CATEGORY ANALYSIS (New Accuracy)              */}
        {/* ------------------------------------------------------ */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            
            {/* Category Distribution (Pie Chart) */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-1">
                <h3 className="mb-2 text-lg font-bold text-gray-800">Category Distribution</h3>
                <p className="mb-6 text-sm text-gray-400">Article count by topic</p>
                
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="count"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Category Performance (Bar Chart) */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
                <h3 className="mb-2 text-lg font-bold text-gray-800">Category Performance</h3>
                <p className="mb-6 text-sm text-gray-400">Comparing views and reading time per category</p>

                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={categoryData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 12}} />
                            <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltip />} />
                            <Legend />
                            <Bar dataKey="totalViews" name="Total Views" fill="#00C49F" barSize={20} radius={[0, 4, 4, 0]} />
                            <Bar dataKey="avgReadingTime" name="Avg Time (min)" fill="#FFBB28" barSize={20} radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* ------------------------------------------------------ */}
        {/* SECTION: ARTICLE DETAILS (Existing)                    */}
        {/* ------------------------------------------------------ */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-bold text-gray-800">Recent Article Trends</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="shortName" tick={{fontSize: 12}} />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="views" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
        </div>

      </div>
    </div>
  )
}

// ----------------------
// HELPER COMPONENTS
// ----------------------

const LoadingState = () => (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
    </div>
);

const KPICard = ({ title, value, icon, color }) => (
  <div className="flex items-center justify-between rounded-xl bg-white p-6 shadow-sm border border-gray-100">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="mt-1 text-2xl font-bold text-gray-800">{value}</p>
    </div>
    <div className={`rounded-lg p-3 ${color} text-xl`}>{icon}</div>
  </div>
)

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-lg z-50">
        <p className="mb-2 font-semibold text-gray-800">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span className="block h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <span className="text-gray-600">{entry.name}:</span>
            <span className="font-medium text-gray-900">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default AnalyticsDashboard