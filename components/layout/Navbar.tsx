import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Dancing_Script } from "@next/font/google";

const dancing = Dancing_Script({ subsets: ["latin"] });

export default function Navbar() {
  const router = useRouter();
  const [textSearch, setTextSearch] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(textSearch);
    router.push(`/search?q=${textSearch}`);
  };

  return (
    <div className="layout-center py-4 flex justify-between items-center sticky">
      <h1 className={`${dancing.className} text-4xl text-red-500 font-bold`}>
        <Link href="/">Yummy</Link>
      </h1>{" "}
      <div className="flex items-center">
        <form onSubmit={handleSubmit} className="mr-2">
          <input
            type="text"
            className="text-slate-800 px-2 py-1 rounded outline-none w-72"
            placeholder="Search for Recipes"
            onChange={handleChange}
          />
        </form>
        <Link
          href="/signup"
          className="py-1 px-6 rounded-xl border border-red-500 text-red-500 mr-5"
        >
          Sign Up
        </Link>
        <Link
          href="/signin"
          className="py-1 px-6 rounded-xl border border-red-500 bg-red-500 text-slate-100"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
