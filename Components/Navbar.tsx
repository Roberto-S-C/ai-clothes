"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useCookies } from "react-cookie";
import Hamburger from "hamburger-react";

function Navbar() {
  const [cookies, setCookie] = useCookies(["token"]);

  const [isOpen, setOpen] = useState(false);

  return (
    <div>
      <div className="hidden md:flex p-2 justify-around w-full bg-yellow-300 items-center">
        <Link href={"/"} className="flex items-center">
          <Image src={"/Logo.png"} width={75} height={75} alt="Logo" />
          <h3 className="ml-3 font-bold text-3xl">Ai Clothes</h3>
        </Link>
        <Link href={"/create"} className="animate-rainbow text-2xl font-bold">
          Create
        </Link>
        <Link href={"/about"} className="text-2xl font-bold">
          About
        </Link>
        {!cookies.token && (
          <Link href={"/login"}>
            <UserCircleIcon className="size-8 text-md" />
          </Link>
        )}
        {cookies.token && (
          <Link href={"/account"}>
            <UserCircleIcon className="size-8 text-md" />
          </Link>
        )}
        <Link href={"/shoppingcart"}>
          <ShoppingCartIcon className="size-6 text-sm" />
        </Link>
      </div>

      <div className="sm:flex md:hidden lg:hidden items-center bg-yellow-300">
        <div className="mx-2">
          <Hamburger toggled={isOpen} size={22} toggle={setOpen} />
        </div>

        <Link href={"/"} className="flex items-center p-2">
          <Image src={"/Logo.png"} width={50} height={50} alt="Logo" />
          <h3 className="ml-3 font-bold text-3xl">Ai Clothes</h3>
        </Link>
      </div>

      {isOpen && (
        <div className="flex flex-col absolute z-20 w-full rounded-b-xl bg-yellow-300">
          <Link
            href={"/create"}
            className="animate-rainbow text-3xl font-bold m-2"
          >
            Create
          </Link>
          <Link href={"/about"} className="text-3xl text-black font-bold m-2">
            About
          </Link>
          {!cookies.token && (
            <Link href={"/login"} className="m-2">
              <div className="flex justify-start items-center">
                <UserCircleIcon className="size-10 text-black" />
                <p className="text-black font-bold text-3xl">Account</p>
              </div>
            </Link>
          )}
          {cookies.token && (
            <Link href={"/account"} className="m-2">
              <div className="flex justify-start items-center">
                <UserCircleIcon className="size-10 text-black" />
                <p className="text-black font-bold text-3xl">Account</p>
              </div>
            </Link>
          )}
          <Link href={"/shoppingcart"} className="m-2">
            <div className="flex justify-start items-center">
              <ShoppingCartIcon className="size-10 text-black" />
              <p className="text-black font-bold text-3xl">Cart</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
export default Navbar;
