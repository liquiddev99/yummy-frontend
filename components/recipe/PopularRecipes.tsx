import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { IRecipeCard } from "types/recipe";
import RecipeCardSkeletonList from "@/components/skeleton/RecipeCardSkeletonList";
import RecipeCardList from "./RecipeCardList";

const POP_RECIPES = gql`
  {
    popularRecipes {
      edges {
        node {
          id
          name
          mainImage
          totalTime
          mealTags
        }
      }
    }
  }
`;

const VN_RECIPES = gql`
  {
    recipeSearch(cuisines: ["Vietnamese"]) {
      edges {
        node {
          id
          name
          mainImage
          instructions
          totalTime
          mealTags
          cuisines
        }
      }
    }
  }
`;

export default function PopularRecipes() {
  const [recipes, setRecipes] = useState<IRecipeCard[]>([]);
  const { loading, error, data } = useQuery(POP_RECIPES);

  useEffect(() => {
    if (!data) return;
    const recipes = data.popularRecipes.edges.map((recipe: any) => {
      return {
        id: recipe.node.id,
        name: recipe.node.name,
        mainImage: recipe.node.mainImage,
        instructions: recipe.node.instructions,
        totalTime: recipe.node.totalTime,
        mealTags: recipe.node.mealTags,
      };
    });

    setRecipes(recipes);
  }, [data]);

  if (!loading && error)
    return <p className="layout-center min-h-screen">Error: {error.message}</p>;

  return (
    <div className="layout-center">
      <div className="text-center mb-8">
        <h3 className="text-5xl font-bold mb-3">Popular Recipes</h3>
        <p className="text-slate-500">
          We provide a variety of recipes with high taste from famous chef
        </p>
      </div>
      {loading && <RecipeCardSkeletonList />}
      {recipes && <RecipeCardList recipes={recipes} />}
    </div>
  );
}
