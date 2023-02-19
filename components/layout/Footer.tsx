import Link from "next/link";
import { Dancing_Script } from "@next/font/google";
import {
  AiFillFacebook,
  AiOutlineTwitter,
  AiFillYoutube,
} from "react-icons/ai";

const dancing = Dancing_Script({ subsets: ["latin"] });
export default function Footer() {
  return (
    <div className="layout-center flex justify-between items-end mt-5 py-6">
      <div>
        <h1 className={`${dancing.className} text-4xl text-red-500 font-bold`}>
          <Link href="/">Yummy</Link>
        </h1>
      </div>
      <div>&#169; 2023 Yummy. Alright Reserved</div>
      <div className="flex">
        <AiFillFacebook className="w-8 h-8 mr-2 cursor-pointer" />
        <AiOutlineTwitter className="w-8 h-8 mr-2 cursor-pointer" />
        <AiFillYoutube className="w-8 h-8 cursor-pointer" />
      </div>
    </div>
  );
}
