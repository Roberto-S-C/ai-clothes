"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [isValid, setIsValid] = useState(true);
  const [emptyFields, setEmptyFields] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordInputType, setPasswordInputType] = useState("password");

  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const loginRequest = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setEmptyFields(true);
    }

    try {
      fetch("http://localhost:5251/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (response.status >= 300) {
            setIsValid(false);
            return null;
          }
          return response.json();
        })
        .then((data) => {
          if (data === null) return;
          setCookie("token", data.token, { path: "/", doNotParse: true });
          console.log(cookies.token);
          router.push("/");
        });
    } catch (e) {
      setIsValid(false);
    }
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="w-1/3 h-3/5 mt-20 p-5 rounded border-2 border-yellow-400 bg-yellow-300">
        <h2 className="w-full text-4xl text-center font-bold">Login</h2>
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
            <p className="text-red-600 font-bold">Fill out the empty fields!</p>
          )}
          {!isValid && (
            <p className="text-red-600 font-bold">Invalid credentials!</p>
          )}
          <button
            type="submit"
            className="rounded text-2xl bg-yellow-300 my-20 border-2 border-black text-black font-extrabold hover:bg-black hover:text-yellow-300 p-2 w-1/3"
            onClick={(e) => loginRequest(e)}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
