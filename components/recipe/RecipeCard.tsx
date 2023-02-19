import Image from "next/image";
import Link from "next/link";
import { FiClock } from "react-icons/fi";
import { GiCookingPot } from "react-icons/gi";

import MealTag from "./MealTag";

import { IRecipeCard } from "types/recipe";
import { useState } from "react";

export default function RecipeCard({
  id,
  name,
  mainImage,
  totalTime,
  mealTags,
}: IRecipeCard) {
  const [loadingImage, setLoadingImage] = useState(true);
  return (
    <Link href={`/recipe/${id}`}>
      <div className="flex flex-col h-full bg-white rounded-xl shadow">
        <div className="w-full h-40 relative overflow-hidden mb-1">
          {loadingImage && (
            <div className="h-full w-full flex items-center justify-center animate-pulse bg-slate-100">
              <GiCookingPot className="h-[4.5rem] w-[4.5rem]" />
            </div>
          )}
          <Image
            src={mainImage}
            alt="Recipe"
            fill={true}
            style={{ objectFit: "cover" }}
            className={`rounded-xl`}
            onLoad={() => setLoadingImage(false)}
          />
        </div>
        <div className="flex flex-col justify-between flex-grow pt-3 pb-5 px-4">
          <div className="text-lg leading-6 mb-3">{name}</div>
          <div className="text-slate-500">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {mealTags && (
                  <>
                    {mealTags.map((mealTag) => (
                      <MealTag key={crypto.randomUUID()} mealTag={mealTag} />
                    ))}
                  </>
                )}
              </div>
              <div className="flex items-center">
                <FiClock className="h-4 w-4 mr-1" />
                <span>{totalTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
