const NewsPageSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-6 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* LEFT SIDEBAR */}
        <div className="space-y-6">

          {/* Filters Card */}
          <div className="bg-white shadow rounded-xl p-5 space-y-4">
            <div className="h-6 w-24 bg-gray-300 rounded"></div>

            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>

          {/* Archives Card */}
          <div className="bg-white shadow rounded-xl p-5 space-y-4">
            <div className="h-6 w-24 bg-gray-300 rounded"></div>

            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-28 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-3 space-y-6">

          {/* Page Title */}
          <div className="h-8 w-32 bg-gray-300 rounded"></div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white shadow rounded-xl overflow-hidden">

                {/* Image */}
                <div className="h-48 bg-gray-300"></div>

                <div className="p-4 space-y-3">

                  {/* Meta */}
                  <div className="flex gap-4">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </div>

                  {/* Title */}
                  <div className="h-5 bg-gray-300 rounded"></div>
                  <div className="h-5 w-5/6 bg-gray-300 rounded"></div>

                  {/* Description */}
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-4/6 bg-gray-200 rounded"></div>

                  {/* Footer */}
                  <div className="flex justify-between items-center pt-3">
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
};

export default NewsPageSkeleton;
