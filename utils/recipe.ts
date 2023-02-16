export function getNutritionString(nutrition: Object) {
  let string = "";
  for (const [key, value] of Object.entries(nutrition)) {
    if (key === "__typename") continue;
    string += `${key}: ${value}, `;
  }
  return string;
}
