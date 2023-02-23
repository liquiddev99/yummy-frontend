import { useRouter } from "next/router";
import { Lora } from "@next/font/google";
import { gql, useQuery } from "@apollo/client";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SIMILAR_RECIPES = gql`
  query similarMacrosRecipes {
    similarMacrosRecipes(
      recipeId: "UmVjaXBlOjZlZDUyNGFmLWVhNTMtNDJhMi05ODEzLTc1MDQzMDNkNjc4Yw=="
      serving: 2
    ) {
      id
    }
  }
`;
export default function SimilarRecipes() {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(SIMILAR_RECIPES, {
    variables: { id },
  });
  console.log("error", error);
  console.log("similar", data);
  return (
    <div className="mt-5">
      <h3 className={`${lora.className} text-3xl font-medium`}>
        Equivalent Recipes
      </h3>
    </div>
  );
}
