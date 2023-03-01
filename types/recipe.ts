export interface IRecipeCard {
  id: string;
  name: string;
  totalTime: string;
  mainImage: string;
  mealTags: string[];
}

export interface IRecipe {
  id: string;
  name: string;
  totalTime: string;
  mainImage: string;
  tags: string[];
  mealTags: string[];
  rating: string;
  authorAvatar: string;
  cuisines: string[];
  ingredientLines: string[];
  nutritionalInfo: { calories: number };
  instructions: string[];
  numberOfServings: number;
}
