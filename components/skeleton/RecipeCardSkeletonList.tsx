import RecipeCardSkeleton from "./RecipeCardSkeleton";
export default function RecipeCardSkeletonList() {
  return (
    <div className="layout-center grid grid-cols-4 gap-8 content-start">
      {Array.from(Array(20).keys()).map((_, index) => (
        <RecipeCardSkeleton key={index} />
      ))}
    </div>
  );
}
