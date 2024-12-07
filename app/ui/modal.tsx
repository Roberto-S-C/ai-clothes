"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/20/solid";

function Modal({ children }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-1/2 h-3/4  bg-white p-4 rounded shadow-lg z-50 overflow-y-auto">
        <div>
          <div className="flex justify-end">
            <button
              onClick={() => router.back()}
              className="mb-4 p-2 text-white rounded"
            >
              <XMarkIcon className="size-6 font-bold text-red-500" />
            </button>
          </div>
          <div className="flex justify-center">
            <h2 className="text-center font-bold text-2xl mb-5 text-yellow-300">Shopping Cart</h2>
            <ShoppingCartIcon className="size-8 ml-3 text-yellow-300" />
          </div>
        </div>
        <div>{children}</div>
        <div className="flex justify-center">
          <button className="bg-yellow-300 p-3 font-bold text-lg border-2 border-black rounded-md hover:text-yellow-300 hover:bg-black">Continue to payment</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
