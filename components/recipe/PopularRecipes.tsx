import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { IRecipeCard } from "types/recipe";
import RecipeCard from "./RecipeCard";

const POP_RECIPES = gql`
  {
    popularRecipes {
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
        cuisines: recipe.node.cuisines,
      };
    });

    setRecipes(recipes);
  }, [data]);

  return (
    <div className="layout-center">
      <div className="text-center mb-8">
        <h3 className="text-5xl font-bold mb-3">Popular Recipes</h3>
        <p className="text-slate-500">
          We provide a variety of recipes with high taste from famous chef
        </p>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
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
      )}
    </div>
  );
}
