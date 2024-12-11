"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaceFrownIcon,
  MinusIcon,
  PlusIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [ammountItems, setAmmountItems] = useState(0);
  const [subtotal, setSubTotal] = useState(0);
  const shipping = 5.99;

  const [productWidth, setProductWidth] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    let windowWidth = window.innerWidth;
    if (windowWidth <= 700) {
      setProductWidth(windowWidth * 3/5);
    } else if (windowWidth <= 1200) {
      setProductWidth(windowWidth / 2);
    } else {
      setProductWidth(windowWidth / 8);
    }
  }, []);

  useEffect(() => {
    let ammountItem = 0;
    let total = 0;
    cart.forEach((item) => {
      ammountItem += parseInt(item.ammount);
      total += parseInt(item.ammount) * parseFloat(item.piecePrice);
    });
    setAmmountItems(ammountItem);
    setSubTotal(total);
  }, [cart]);

  const updateCart = (index, delta) => {
    const newCart = [...cart];
    newCart[index].ammount += delta;
    if (newCart[index].ammount < 1) newCart[index].ammount = 1; // Ensure amount is at least 1
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <div className="flex  lg:justify-self-center justify-center lg:w-11/12">
      {cart.length === 0 ? (
        <div className="flex flex-col justify-center items-center w-full">
          <p className="m-2 text-2xl font-bold">Your cart is empty...</p>
          <FaceFrownIcon className="size-12" />
          <button
            onClick={() => router.replace("/")}
            className="bg-yellow-300 p-3 rounded-md font-bold text-xl hover:bg-black hover:text-yellow-300 m-2"
          >
            Go Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-center flex-3">
          <div className="sm:w-full lg:w-3/5 mt-6">
            {cart.map((item, index) => (
              <div
                key={`${item.productId}-${item.pieceId}-${item.size}`}
                className="border-2 border-black rounded-md bg-black p-3 m-3"
              >
                <div className="flex flex-col items-center lg:flex-row relative">
                  <button
                    onClick={() => {
                      let newCart = [...cart];
                      newCart.splice(index, 1);
                      localStorage.setItem("cart", JSON.stringify(newCart));
                      setCart(newCart);
                    }}
                    className="absolute right-0 top-2"
                  >
                    <XCircleIcon className="size-8 text-yellow-300 hover:text-red-600" />
                  </button>
                  <div className="relative" style={{width: productWidth}}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${item.pieceImage}`}
                      alt={`${item.pieceColor} ${item.pieceFabric} ${item.pieceName}`}
                      width={productWidth}
                      height={productWidth}
                    />
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${item.designImage}`}
                      alt={item.designName}
                      width={productWidth / 3}
                      height={productWidth / 3}
                      className="absolute"
                      style={{
                        left: "33.33%",
                        top: "15%",
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-center lg:block">
                    <p className="m-3 font-bold text-2xl text-yellow-300">
                      {item.designName}
                    </p>
                    <p className="inline m-3 p-2 rounded-md border-2 text-sm border-black bg-yellow-300 font-bold">
                      {item.size}
                    </p>
                    <div className="flex m-3">
                      <div>
                        <button
                          onClick={() => updateCart(index, -1)}
                          className="px-3 py-1"
                        >
                          <MinusIcon className="size-6 text-yellow-300 hover:text-yellow-500" />
                        </button>
                      </div>
                      <div className="border-2 border-yellow-300 px-3 py-1 rounded-md">
                        <p className="text-yellow-300">{item.ammount}</p>
                      </div>
                      <div>
                        <button
                          onClick={() => updateCart(index, 1)}
                          className="px-3 py-1"
                        >
                          <PlusIcon className="size-6 text-yellow-300 hover:text-yellow-500" />
                        </button>
                      </div>
                    </div>
                    <p className="m-3 font-bold text-lg text-yellow-300">
                      {item.piecePrice} $
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1 w-11/12 mt-9 border-2 border-black rounded-md p-5">
            <div className="flex flex-wrap items-center h-full">
              <p className="w-full font-bold text-2xl">Order Summary</p>
              {ammountItems > 1 ? (
                <p className="w-full">{ammountItems} articles</p>
              ) : (
                <p className="w-full">{ammountItems} article</p>
              )}
              <p className="w-full">Shipping {shipping}$</p>
              <p className="font-bold text-lg w-full">
                Subtotal {(subtotal + shipping).toFixed(2)}$
              </p>
              <div className="flex justify-center w-full">
                <button onClick={() => router.push("/checkout")} className="bg-yellow-300 w-1/3 p-3 mt-5 lg:m-auto font-bold text-2xl rounded-md hover:text-yellow-300 hover:bg-black">
                  Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
