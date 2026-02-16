const ArticleSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-6 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SIDE (Article Content) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Tags */}
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
          </div>

          {/* Title */}
          <div className="h-10 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-10 w-2/3 bg-gray-300 rounded"></div>

          {/* Meta Info */}
          <div className="flex gap-4">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-10 bg-gray-200 rounded"></div>
          </div>

          {/* Featured Image */}
          <div className="w-full h-[400px] bg-gray-300 rounded-lg"></div>

          {/* Paragraph Lines */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
          </div>

        </div>

        {/* RIGHT SIDE (Sidebar) */}
        <div className="space-y-6">

          {/* Top Posts Card */}
          <div className="bg-white shadow rounded-lg p-4 space-y-4">
            <div className="h-6 w-24 bg-gray-300 rounded"></div>

            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>

          {/* Archive Card */}
          <div className="bg-white shadow rounded-lg p-4 space-y-4">
            <div className="h-6 w-24 bg-gray-300 rounded"></div>

            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;
