import Image from "next/image";
import Link from "next/link";
import { ClockIcon } from "@heroicons/react/24/outline";

import { IRecipeCard } from "types/recipe";

export default function RecipeCard({
  id,
  name,
  mainImage,
  totalTime,
  mealTags,
}: IRecipeCard) {
  return (
    <Link href={`/recipe/${id}`}>
      <div className="flex flex-col h-full">
        <div className="w-[18rem] h-40 relative overflow-hidden mb-1">
          <Image
            src={mainImage}
            alt="Recipe"
            fill={true}
            style={{ objectFit: "cover" }}
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col justify-between flex-grow">
          <div className="text-base leading-5 mb-1">{name}</div>
          <div className="text-slate-500">
            {mealTags && <div>{mealTags.join(", ")}</div>}{" "}
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              <span>{totalTime}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
