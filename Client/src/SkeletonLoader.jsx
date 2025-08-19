export default function SkeletonLoader() {
  return (
    <div className="animate-pulse">
      {/* Image Placeholder */}
      <div className="aspect-square mb-2 rounded-2xl bg-gray-300"></div>
      
      {/* Text Placeholders */}
      <div className="space-y-2">
        <div className="h-4 w-3/4 rounded bg-gray-300"></div>
        <div className="h-3 w-1/2 rounded bg-gray-300"></div>
        <div className="h-4 w-1/3 rounded bg-gray-300 mt-1"></div>
      </div>
    </div>
  );
}