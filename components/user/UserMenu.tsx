import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { BiUserCircle } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { IoFastFood } from "react-icons/io5";
import Cookies from "js-cookie";
import Link from "next/link";
import axios from "axios";

export default function UserMenu({
  refresh,
  setRefresh,
}: {
  refresh: boolean;
  setRefresh: Function;
}) {
  const router = useRouter();
  const logout = async () => {
    await axios.post(
      "http://localhost:8080/users/logout",
      {},
      { withCredentials: true }
    );
    Cookies.remove("isAuth");
    setRefresh(!refresh);
    if (router.pathname.includes("profile")) {
      router.push("/");
    }
  };
  return (
    <Menu as="div" className="relative text-left ml-3">
      <div className="flex items-center">
        <Menu.Button className="">
          <FaUser className="h-7 w-7" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/profile"
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2`}
                >
                  <BiUserCircle className="mr-2 h-6 w-6" />
                  My Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2`}
                >
                  <IoFastFood className="mr-2 h-6 w-6" />
                  Favorite Recipes
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <HiOutlineLogout
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <HiOutlineLogout
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  Archive
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <HiOutlineLogout
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <HiOutlineLogout
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  Move
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-red-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2`}
                  onClick={logout}
                >
                  <HiOutlineLogout className="h-6 w-6 mr-2" />
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
