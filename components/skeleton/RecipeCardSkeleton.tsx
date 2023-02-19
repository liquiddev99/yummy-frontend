export default function RecipeCardSkeleton() {
  return (
    <div>
      <div className="h-40 bg-slate-300 animate-pulse rounded-xl"></div>
      <div className="h-5 mt-4 bg-slate-300 animate-pulse rounded-md"></div>
      <div className="flex justify-between">
        <div className="flex">
          <div className="w-14 h-6 mt-2 bg-slate-300 animate-pulse rounded-full mr-2"></div>
          <div className="w-14 h-6 mt-2 bg-slate-300 animate-pulse rounded-full"></div>
        </div>
        <div className="w-32 h-6 mt-2 bg-slate-300 animate-pulse rounded-full"></div>
      </div>
    </div>
  );
}
