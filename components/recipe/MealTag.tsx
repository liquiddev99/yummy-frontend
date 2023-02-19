export default function MealTag({ mealTag }: { mealTag: string }) {
  let tag = "";
  switch (mealTag) {
    case "Dinner":
      tag = "green";
      break;
    case "Lunch":
      tag = "blue";
      break;
    case "Snack":
      tag = "red";
      break;
    case "Breakfast":
      tag = "purple";
      break;
    default:
      break;
  }
  return (
    <div className={`${tag} py-[0.15rem] px-3 rounded-2xl mr-1`}>{mealTag}</div>
  );
}
