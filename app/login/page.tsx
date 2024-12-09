"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { HashLoader } from "react-spinners";

function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [isValid, setIsValid] = useState(true);
  const [emptyFields, setEmptyFields] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordInputType, setPasswordInputType] = useState("password");

  const [isLoading, setLoading] = useState(false);

  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const loginRequest = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setEmptyFields(true);
    }

    setEmptyFields(false);
    setLoading(true);

    try {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (response.status >= 300) {
            setIsValid(false);
            setLoading(false);
            return null;
          }
          return response.json();
        })
        .then((data) => {
          if (data === null) return;
          setCookie("token", data.token, { path: "/" });
          router.push("/");
        });
    } catch (e) {
      setIsValid(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {isLoading ? (
        <HashLoader size={50} color={"#fcd34d"} loading={true} />
      ) : (
        <div className="flex flex-col items-center sm:w-full md:w-2/3 lg:w-1/3 p-5 rounded border-2 border-yellow-400 bg-yellow-300">
          <h2 className="w-full text-4xl  text-center font-bold">Login</h2>
          <form className="flex flex-col justify-center items-center w-full mt-10">
            <div className="w-4/5 py-5">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border-b-2 border-black bg-yellow-300 w-full font-bold text-lg placeholder:text-black"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex w-4/5 py-5">
              <input
                type={passwordInputType}
                name="password"
                placeholder="Password"
                className="border-b-2 border-black bg-yellow-300 w-full font-bold text-lg placeholder:text-black"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  showPassword
                    ? setPasswordInputType("password")
                    : setPasswordInputType("text");
                  setShowPassword(!showPassword);
                }}
                className="flex justify-end bg-yellow-300 border-b-2 border-b-black"
              >
                {showPassword && <EyeSlashIcon className="size-6" />}
                {!showPassword && <EyeIcon className="size-6" />}
              </button>
            </div>
            {emptyFields && (
              <p className="text-red-600 font-bold">
                Fill out the empty fields!
              </p>
            )}
            {!isValid && (
              <p className="text-red-600 font-bold">Invalid credentials!</p>
            )}
            <Link href={"/register"}>Don't have an account?</Link>
            <button
              type="submit"
              className="rounded text-2xl bg-yellow-300 my-20 border-2 border-black text-black font-extrabold hover:bg-black hover:text-yellow-300 p-2 w-1/3"
              onClick={(e) => loginRequest(e)}
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
