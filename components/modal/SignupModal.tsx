import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";

interface Props {
  setIsOpen: Function;
  isOpen: boolean;
}

export default function SignupModal({ setIsOpen, isOpen }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setInputs({
      ...inputs,
      [name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      const jwtKey = process.env.NEXT_PUBLIC_JWT_SECRET;
      if (!jwtKey) return;
      const res = await axios.post(
        "http://localhost:8080/users/signup",
        inputs
      );
      setIsSubmitting(false);
      setInputs({ name: "", email: "", password: "" });
      Cookies.set("auth", res.data.token, {
        secure: true,
        sameSite: "strict",
        expires: 1,
      });
      setIsOpen(false);
    } catch (err: any) {
      setIsSubmitting(false);
      console.log(err?.response?.data);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full flex flex-col items-center max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl mb-6 font-medium leading-6 text-gray-900"
                  >
                    Signup
                  </Dialog.Title>
                  <div className="mt-2 w-11/12">
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col items-center"
                    >
                      <input
                        type="text"
                        name="name"
                        value={inputs.name}
                        required
                        placeholder="Name"
                        className="p-2 mb-3 w-full border-b outline-none"
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="email"
                        value={inputs.email}
                        required
                        placeholder="Email"
                        className="p-2 mb-3 w-full border-b outline-none"
                        onChange={handleChange}
                      />
                      <input
                        type="password"
                        required
                        name="password"
                        value={inputs.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="p-2 mb-6 w-full border-b outline-none"
                      />
                      <button
                        type="submit"
                        className={`w-full p-2 bg-red-500 text-slate-200 rounded-xl ${
                          isSubmitting && "opacity-80"
                        }`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Signing..." : "Sign up"}
                      </button>
                    </form>
                    <div className="flex flex-col items-center mt-6">
                      <div className="text-slate-600">Or Sign up with</div>
                      <div className="flex justify-between w-full mt-3">
                        <div className="shadow rounded-full p-1 px-8 cursor-pointer">
                          <FcGoogle className="h-7 w-7" />
                        </div>
                        <div className="shadow rounded-full px-8 cursor-pointer flex items-center">
                          <FaTwitter className="h-7 w-7 text-[#1DA1F2]" />
                        </div>
                        <div className="shadow rounded-full p-1 px-8 cursor-pointer">
                          <BsFacebook className="h-7 w-7 text-[#0268E2]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
