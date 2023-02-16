import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ClockIcon } from "@heroicons/react/24/outline";

import { getNutritionString } from "utils/recipe";
import { IRecipe } from "types/recipe";

const RECIPE_BY_ID = gql`
  query Recipe($id: ID!) {
    recipe(id: $id) {
      databaseId
      totalTime
      totalTimeInSeconds
      name
      rating
      numberOfServings
      ingredientLines
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
`;

export default function Recipe() {
  const [recipe, setRecipe] = useState<IRecipe>();
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(RECIPE_BY_ID, {
    variables: { id },
  });

  useEffect(() => {
    if (!data) return;
    console.log(data.recipe);
    setRecipe(data.recipe);
  }, [data]);

  if (loading) return <div className="layout-center">Loading...</div>;
  if (error) return <p className="layout-center">Error: {error.message}</p>;

  return (
    <div className="layout-center mt-4">
      {recipe ? (
        <div>
          <div className="flex">
            <div>
              <Image
                src={recipe.mainImage}
                alt="Author Avatar"
                width={600}
                height={200}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="ml-5 flex-grow">
              <h3 className="text-3xl">{data.recipe.name}</h3>
              {recipe.cuisines && (
                <div className="text-slate-600">
                  {recipe.cuisines.join(", ")}
                </div>
              )}
              {recipe.totalTime && (
                <div className="flex items-center text-slate-600">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  <span>{recipe.totalTime}</span>
                </div>
              )}
              <div className="flex">
                <div className="w-1/2">
                  <h3 className="text-2xl text-emerald-600">Ingredients</h3>
                  <ul className="list-disc ml-4">
                    {recipe.ingredientLines.map((ingredient) => (
                      <li key={ingredient}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                {/*
                <div className="w-1/2">
                  <h3 className="text-2xl text-red-500">Nutritions</h3>
                  <div>{getNutritionString(recipe.nutritionalInfo)}</div>
                </div>
                */}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <ol className="list-decimal ml-4">
              {recipe.instructions.map((instruction) => (
                <li key={instruction}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      ) : (
        <p>Not Found</p>
      )}
    </div>
  );
}
