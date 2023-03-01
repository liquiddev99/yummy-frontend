import { useState, useEffect } from "react";
import { Lora } from "@next/font/google";
import { gql, useQuery } from "@apollo/client";
import { IRecipeCard } from "@/types/recipe";
import RecipeCard from "./RecipeCard";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SIMILAR_RECIPES = gql`
  query similarMacrosRecipes($tags: [String!]!) {
    recipeSearch(tags: $tags) {
      edges {
        node {
          id
          name
          mealTags
          mainImage
          totalTime
        }
      }
    }
  }
`;
export default function SimilarRecipes({
  tags,
  initId,
}: {
  tags: string[];
  initId: string;
}) {
  const [recipes, setRecipes] = useState<IRecipeCard[]>([]);
  const { loading, error, data } = useQuery(SIMILAR_RECIPES, {
    variables: { tags },
  });

  useEffect(() => {
    if (!data) return;
    const recipes = data.recipeSearch.edges.map((recipe: any) => {
      return {
        id: recipe.node.id,
        name: recipe.node.name,
        mainImage: recipe.node.mainImage,
        totalTime: recipe.node.totalTime,
        mealTags: recipe.node.mealTags,
      };
    });

    setRecipes(recipes);
  }, [data]);

  if (loading || error || !recipes.length) return <></>;

  return (
    <div className="mt-8">
      <h3 className={`${lora.className} text-3xl font-medium`}>
        Recipes you may like
      </h3>
      <div className="flex mt-4">
        {recipes
          .filter((recipe) => recipe.id !== initId)
          .slice(0, 4)
          .map((recipe) => (
            <div
              key={recipe.id}
              className="mx-3 basis-0 grow first:ml-0 last:mr-0"
            >
              <RecipeCard
                id={recipe.id}
                name={recipe.name}
                mealTags={recipe.mealTags}
                totalTime={recipe.totalTime}
                mainImage={recipe.mainImage}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
