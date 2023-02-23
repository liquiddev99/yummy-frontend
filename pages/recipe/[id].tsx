import { Lora } from "@next/font/google";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { HiOutlineFire } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";

import MealTag from "../../components/recipe/MealTag";
import { IRecipe } from "types/recipe";
import Cuisine from "@/components/recipe/Cuisine";
import DetailRecipeSkeleton from "@/components/skeleton/DetailRecipeSkeleton";
import SimilarRecipes from "@/components/recipe/SimilarRecipes";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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

  if (loading) return <DetailRecipeSkeleton />;
  if (error)
    return <p className="layout-center min-h-screen">Error: {error.message}</p>;

  return (
    <div className="layout-center mt-4">
      {recipe ? (
        <div>
          <div className="flex">
            <div className="w-[43%] min-h-[350px] max-h-[420px] overflow-hidden relative">
              <Image
                src={recipe.mainImage}
                alt="Recipe"
                fill={true}
                style={{ objectFit: "cover" }}
                className="rounded"
              />
            </div>
            <div className="ml-5 flex-grow flex flex-col">
              <h3 className={`text-5xl mb-3 ${lora.className} font-medium`}>
                {data.recipe.name}
              </h3>
              {recipe.cuisines?.length ? (
                <div className="text-slate-600 mb-3 flex">
                  {recipe.cuisines.map((cuisine) => (
                    <Cuisine cuisine={cuisine} key={uuidv4()} />
                  ))}
                </div>
              ) : (
                ""
              )}

              {recipe.mealTags && (
                <div className="flex items-center mb-3">
                  {recipe.mealTags.map((mealTag) => (
                    <MealTag mealTag={mealTag} key={uuidv4()} />
                  ))}
                </div>
              )}
              <div className="flex-grow">
                <div className="flex items-end mb-2">
                  <AiOutlineClockCircle className="w-7 h-7 mr-1" />
                  <span className="text-lg mr-1">Total Time:</span>
                  <span className="text-lg">{recipe.totalTime}</span>
                </div>
                <div className="flex items-end mb-2">
                  <HiOutlineFire className="w-7 h-7 mr-1" />
                  <span className="text-lg mr-1">Calories: </span>
                  <span className="text-lg">
                    {(recipe.nutritionalInfo.calories * 1000).toFixed(1)} Kcals
                  </span>
                </div>
                <div className="flex items-end">
                  <BsPeople className="w-7 h-7 mr-1" />
                  <span className="text-lg mr-1">Servings: </span>
                  <span className="text-lg">{recipe.numberOfServings}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex">
            <div className="w-1/2 rounded-xl mr-5">
              <h3 className={`${lora.className} font-medium text-4xl mb-2`}>
                Ingredients
              </h3>
              <ul className="list-disc ml-4 text-lg">
                {recipe.ingredientLines.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="w-1/2 ml-5">
              <h3 className={`${lora.className} font-medium text-4xl mb-2`}>
                Directions
              </h3>
              <ol className="list-decimal ml-6 text-lg">
                {recipe.instructions.map((instruction) => (
                  <li key={instruction}>{instruction}</li>
                ))}
              </ol>
            </div>
          </div>
          <SimilarRecipes />
        </div>
      ) : (
        <p>Not Found</p>
      )}
    </div>
  );
}
