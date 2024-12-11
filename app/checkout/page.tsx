'use client'

import React from "react";
import { useRouter } from "next/navigation";
import { FaceFrownIcon } from "@heroicons/react/20/solid";

function Checkout() {
  const router = useRouter();

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="sm:text-md lg:text-xl font-bold">Coming soon...</p>
        <FaceFrownIcon className="size-12 text-yellow-300 mt-3" />
        <button
          onClick={() => router.push("/")}
          className="bg-yellow-300 font-bold p-2 mt-3 rounded-md hover:bg-black hover:text-yellow-300"
        >
            Go Back
        </button>
      </div>
    </div>
  );
}

export default Checkout;
