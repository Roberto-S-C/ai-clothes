import { FaceFrownIcon, TrashIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { HashLoader } from "react-spinners";

import { ToastContainer, toast } from "react-custom-alert";
import "react-custom-alert/dist/index.css";

function MyProduct() {
  const [cookies, setCookie] = useCookies(["token"]);

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [productWidth, setProductWidth] = useState(0);

  const [products, setProducts] = useState(null);

  const alertSuccess = () => toast.success("Item deleted successfully!");

  useEffect(() => {
    let windowWidth = window.innerWidth;
    if (windowWidth <= 700) {
      setProductWidth((windowWidth * 3) / 5);
    } else if (windowWidth <= 1200) {
      setProductWidth(windowWidth / 2);
    } else {
      setProductWidth(windowWidth / 8);
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/user`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const deleteProduct = (id) => {
    const token = cookies.token;

    setLoading(true);

    if (!token) return router.replace("/login");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setProducts(products.filter(p => p.id !== id));
      alertSuccess();
      setLoading(false);
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader size={50} color={"#fcd34d"} loading={true} />
      </div>
    );

  return (
    <div className="mx-3 lg:w-3/5">
      <ToastContainer floatingTime={3000} />
      {products && products.length < 1 && (
        <div className="flex flex-col justify-center items-center h-screen">
          <p className="sm:text-md lg:text-xl font-bold">
            You haven't created any products yet
          </p>
          <FaceFrownIcon className="size-12 text-yellow-300 mt-3" />
          <button className="bg-yellow-300 font-bold p-2 mt-3 rounded-md hover:bg-black hover:text-yellow-300">
            Create Products
          </button>
        </div>
      )}
      {products && products.length >= 1 && (
        <div>
          {products.map((product) => {
            const formattedDate = new Date(product.designDate).toLocaleString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }
            );
            return (
              <div
                key={product.id}
                className="flex flex-col items-center lg:flex lg:flex-row relative bg-black rounded-md p-3 m-2"
              >
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="absolute right-0 top-3 md:right-3 text-yellow-300 hover:text-red-500"
                >
                  <TrashIcon className="size-8" />
                </button>
                <div className="relative" style={{ width: productWidth }}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${product.pieceImage}`}
                    width={productWidth}
                    height={productWidth}
                    alt={`${product.pieceColor} ${product.pieceFabric} ${product.pieceName}`}
                  />
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${product.designImage}`}
                    width={productWidth / 3}
                    height={productWidth / 3}
                    alt={product.designName}
                    style={{
                      left: "33%",
                      top: "15%",
                    }}
                    className="absolute"
                  />
                </div>
                <div className="flex flex-1 flex-wrap  m-2">
                  <p className="w-full text-yellow-300 font-bold text-3xl">
                    {product.designName}
                  </p>
                  <div className="flex-1 bg-yellow-300 border-2 border-black rounded-md p-2">
                    <p className="text-black font-bold text-lg">Prompt</p>
                    <p className="text-black text-md w-full">
                      {product.designPrompt}
                    </p>
                  </div>
                  <div className="w-full flex justify-end items-end">
                    <p className="text-yellow-300 font-bold text-sm">
                      Created: {formattedDate}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyProduct;
