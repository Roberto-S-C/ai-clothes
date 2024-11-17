"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

function Navbar() {

  return (
    <div className="flex p-2 justify-around w-full bg-yellow-300 items-center">
      <Link href={"/"} className="flex items-center">
        <Image src={"/Logo.png"} width={75} height={75} alt="Logo" />
        <h3 className="ml-3 font-bold text-3xl">Ai Clothes</h3>
      </Link>
      <Link href={"/create"} className="animate-rainbow text-lg font-bold">Create</Link>
      <Link href={"/create"} className="text-lg font-bold">About</Link>
      <Link href={"/create"} className="text-lg font-bold">Contact</Link>
        <Link href={"/"}>
          <UserCircleIcon className="size-8 text-md" />
        </Link>
      <ShoppingCartIcon className="size-6 text-sm" />
    </div>
  );
}
export default Navbar;
