import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

import RecipeCardList from "@/components/recipe/RecipeCardList";
import { IRecipeCard } from "types/recipe";
import RecipeCardSkeletonList from "@/components/skeleton/RecipeCardSkeletonList";

const SEARCH_RECIPE = gql`
  query Recipe($q: String!) {
    recipeSearch(query: $q, hasInstructions: true) {
      edges {
        node {
          id
          databaseId
          totalTime
          totalTimeInSeconds
          name
          rating
          numberOfServings
          ingredientLines
          mealTags
          ingredients {
            name
          }
          language
          courses
          cuisines
          source {
            siteUrl
            displayName
            recipeUrl
          }
          mainImage
          isPremium
          isFeatured
          author
          authorAvatar
          ingredientsCount
          favoritesCount
          isUserFavorite
          inUserShoppingList
          weightInGrams
          servingWeight
          isLogged
          relativeCalories {
            carbs
            fat
            protein
            fat
          }
          instructions
          nutritionalInfo {
            calories
            protein
            carbs
            fat
            sugar
            fiber
            saturatedFat
            monounsaturatedFat
            polyunsaturatedFat
            transFat
            cholesterol
            sodium
            potassium
            vitaminA
            vitaminC
            calcium
            iron
            netcarbs
          }
        }
      }
    }
  }
`;
export default function RecipeSearch() {
  const [recipes, setRecipes] = useState<IRecipeCard[]>([]);
  const router = useRouter();
  const { q } = router.query;

  const { loading, error, data } = useQuery(SEARCH_RECIPE, {
    variables: { q },
  });

  useEffect(() => {
    if (!data) return;
    const recipes = data.recipeSearch.edges.map((recipe: any) => {
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

  useEffect(() => {
    if (loading) setRecipes([]);
  }, [q]);

  if (loading) return <RecipeCardSkeletonList />;
  if (error)
    return <p className="layout-center min-h-screen">Error: {error.message}</p>;

  return (
    <div className="layout-center mt-2">
      {recipes.length ? (
        <RecipeCardList recipes={recipes} />
      ) : (
        <div className="text-3xl font-medium min-h-screen">
          No results for &quot;{q}&quot;
        </div>
      )}
    </div>
  );
}
