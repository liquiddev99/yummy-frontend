import { IRecipeCard } from "@/types/recipe";
import RecipeCardList from "./RecipeCardList";

export default function PopularRecipes({
  recipes,
}: {
  recipes: IRecipeCard[];
}) {
  return (
    <div className="layout-center">
      <div className="text-center mb-8">
        <h3 className="text-5xl font-bold mb-3">Popular Recipes</h3>
        <p className="text-slate-500">
          We provide a variety of recipes with high taste from famous chef
        </p>
      </div>
      {recipes && <RecipeCardList recipes={recipes} />}
    </div>
  );
}
