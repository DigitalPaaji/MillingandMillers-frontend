import React from 'react'

const LoderCompo = () => {
  return (

    <div className="min-h-screen animate-pulse bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Header Skeleton */}
        <div className="space-y-3 border-b border-gray-200 pb-5">
          <div className="h-8 w-64 rounded-md bg-gray-200"></div>
          <div className="h-4 w-40 rounded-md bg-gray-200"></div>
        </div>

        {/* KPI Cards Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex h-32 items-center justify-between rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-gray-200"></div>
                <div className="h-8 w-16 rounded bg-gray-200"></div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-gray-200"></div>
            </div>
          ))}
        </div>

        {/* Monthly Trend Chart Skeleton */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
           <div className="mb-6 flex justify-between">
              <div className="space-y-2">
                 <div className="h-6 w-48 rounded bg-gray-200"></div>
                 <div className="h-4 w-32 rounded bg-gray-200"></div>
              </div>
              <div className="h-10 w-10 rounded bg-gray-200"></div>
           </div>
           <div className="h-64 w-full rounded-lg bg-gray-100"></div>
        </div>

        {/* Bottom Grid Skeleton */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Pie Chart Area */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-1">
                <div className="mb-4 h-6 w-32 rounded bg-gray-200"></div>
                <div className="mx-auto h-48 w-48 rounded-full bg-gray-200"></div>
            </div>

            {/* Bar Chart Area */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
                <div className="mb-4 h-6 w-48 rounded bg-gray-200"></div>
                <div className="flex items-end gap-2 h-48">
                   {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-full rounded-t bg-gray-200" style={{ height: `${Math.random() * 100}%` }}></div>
                   ))}
                </div>
            </div>
        </div>

      </div>
    </div>

  )
}

export default LoderCompo