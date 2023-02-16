import Link from "next/link";
import { Dancing_Script } from "@next/font/google";

const dancing = Dancing_Script({ subsets: ["latin"] });

export default function Navbar() {
  return (
    <div className="layout-center py-4 flex justify-between items-center">
      <h1 className={`${dancing.className} text-4xl text-red-600 font-bold`}>
        <Link href="/">Yummy</Link>
      </h1>
      <div className="flex items-center">
        <Link href="/" className="mr-8 hover:text-red-600">
          Home
        </Link>
        <Link href="/about" className="mr-8 hover:text-red-600 cursor-pointer">
          About
        </Link>
        <button className="py-1 px-6 rounded-xl border border-red-500 text-red-500 mr-5">
          Sign Up
        </button>
        <button className="py-1 px-6 rounded-xl border border-red-500 bg-red-500 text-slate-100">
          Sign In
        </button>
      </div>
    </div>
  );
}
