import RecipeCard from "./RecipeCard";
import { IRecipeCard } from "@/types/recipe";

export default function RecipeCardList({
  recipes,
}: {
  recipes: IRecipeCard[];
}) {
  return (
    <div className="grid grid-cols-4 gap-8 content-start">
      {recipes &&
        recipes.map((recipe: IRecipeCard) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            mainImage={recipe.mainImage}
            name={recipe.name}
            totalTime={recipe.totalTime}
            mealTags={recipe.mealTags}
          />
        ))}
    </div>
  );
}
