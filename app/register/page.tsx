"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { HashLoader } from "react-spinners";

function Register() {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [isValid, setIsValid] = useState(true);
  const [emptyFields, setEmptyFields] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordInputType, setPasswordInputType] = useState("password");

  const router = useRouter();
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);

  const [isLoading, setLoading] = useState(false);

  const registerRequest = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      return setEmptyFields(true);
    }

    setLoading(true);

    try {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
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
    } catch (error) {
      setIsValid(false);
    }
  };

  return (
    <div className="flex justify-center md:h-screen lg:h-auto">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <HashLoader size={50} color={"#fcd34d"} loading={true} />
        </div>
      ) : (
        <div className="sm:w-full md:w-2/3 md:h-3/5 lg:w-1/3 lg:h-3/5 mt-20 p-5 rounded border-2 border-yellow-400 bg-yellow-300">
          <h2 className="w-full text-4xl text-center font-bold">Register</h2>
          <form className="flex flex-col justify-center items-center w-full mt-10">
            <div className="w-4/5 py-5">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="border-b-2 border-black bg-yellow-300 w-full font-bold text-lg placeholder:text-black"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

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
            <Link href={"/login"}>Already have an account?</Link>
            <button
              type="submit"
              className="rounded text-2xl bg-yellow-300 my-20 border-2 border-black text-black font-extrabold hover:bg-black hover:text-yellow-300 p-2"
              onClick={(e) => registerRequest(e)}
            >
              Register
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Register;
