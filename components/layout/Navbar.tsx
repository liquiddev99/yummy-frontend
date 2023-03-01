import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Dancing_Script } from "@next/font/google";
import Cookies from "js-cookie";
import { BiUserCircle } from "react-icons/bi";

import SignupModal from "../modal/SignupModal";

import { useAuth } from "hooks/auth";
import LoginModal from "../modal/LoginModal";

const dancing = Dancing_Script({ subsets: ["latin"] });

export default function Navbar() {
  const router = useRouter();
  const isAuth = useAuth();
  const [textSearch, setTextSearch] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        {!isAuth ? (
          <>
            <div
              className="py-1 px-6 rounded-xl border border-red-500 text-red-500 mr-5 cursor-pointer"
              onClick={() => setSignup(true)}
            >
              Sign Up
            </div>
            <div
              className="py-1 px-6 rounded-xl border border-red-500 bg-red-500 text-slate-100 cursor-pointer"
              onClick={() => setLogin(true)}
            >
              Sign In
            </div>
          </>
        ) : (
          <div
            onClick={() => {
              Cookies.remove("auth");
              setRefresh(!refresh);
            }}
            className="cursor-pointer"
          >
            <BiUserCircle className="h-8 w-8" />
          </div>
        )}
      </div>
      <SignupModal isOpen={signup} setIsOpen={setSignup} />
      <LoginModal isOpen={login} setIsOpen={setLogin} />
    </div>
  );
}
