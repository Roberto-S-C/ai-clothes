"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Product from "../../Components/Product";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";

function ProductPage() {
  const [product, setProduct] = useState(null);

  const [productWidth, setProductWidth] = useState(0);

  const [sizes, setSizes] = useState(["S", "M", "L", "XL"]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  const params = useParams();

  useEffect(() => {
    let windowWidth = window.innerWidth;
    windowWidth <= 1024
      ? setProductWidth(windowWidth * 4/5)
      : setProductWidth(windowWidth / 3);
    fetch(`http://0000:5000/api/product/${params.product}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);

  return (
    <div className="flex items-center justify-center sm:h-screen lg:h-auto">
      <div className={`w-${productWidth}`}>
        {product && (
          <div className="flex flex-wrap">
            <Product
              product={product}
              size={{ width: productWidth, height: productWidth }}
            />
          </div>
        )}

        {product && (
          <div>
            <h3 className="font-bold text-3xl text-yellow-400 m-1">
              {product.designName}
            </h3>
            <div>
              <p className="font-bold text-lg m-1">
                Promt made by {product.userName}
              </p>
              <p className="bg-yellow-300 border-2 border-black rounded inline-block p-2 m-1">
                {product.designPrompt}
              </p>
            </div>

            <div className="flex m-1">
              {sizes.map((size) => {
                return selectedSize === size ? (
                  <button
                    key={size}
                    className="flex flex-1 justify-center border-2 border-black rounded-md bg-black text-yellow-300 m-1 p-1 font-bold"
                  >
                    {size}
                  </button>
                ) : (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="flex flex-1 justify-center border-2 border-black rounded-md bg-yellow-300 m-1 p-1 hover:bg-yellow-500 font-bold"
                  >
                    {size}
                  </button>
                );
              })}
            </div>

            <p className="font-bold text-xl m-1">{product.piecePrice} $</p>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  let cart = JSON.parse(localStorage.getItem("cart"));
                  if (cart) {
                    let item = {
                      productId: product.id,
                      designName: product.designName,
                      designImage: product.designImage,
                      pieceId: product.pieceId,
                      pieceImage: product.pieceImage,
                      pieceFabric: product.pieceFabric,
                      pieceName: product.pieceName,
                      pieceColor: product.pieceColor,
                      piecePrice: product.piecePrice,
                      ammount: 1,
                      size: selectedSize,
                    };
                    let duplicated = false;
                    cart.forEach((i) => {
                      if (
                        i.productId == item.productId &&
                        i.size == item.size
                      ) {
                        duplicated = true;
                        i.ammount += 1;
                      }
                    });
                    if (!duplicated) {
                      cart.push(item);
                    }
                    localStorage.setItem("cart", JSON.stringify(cart));
                  } else {
                    let newCart = [];
                    newCart[0] = {
                      productId: product.id,
                      designName: product.designName,
                      designImage: product.designImage,
                      pieceId: product.pieceId,
                      pieceImage: product.pieceImage,
                      pieceFabric: product.pieceFabric,
                      pieceName: product.pieceName,
                      pieceColor: product.pieceColor,
                      piecePrice: product.piecePrice,
                      ammount: 1,
                      size: selectedSize,
                    };
                    localStorage.setItem("cart", JSON.stringify(newCart));
                  }
                }}
                className="flex bg-yellow-300 font-bold p-3 rounded-md hover:bg-black hover:text-yellow-300"
              >
                Add to Cart <ShoppingCartIcon className="size-6 text-md ml-2" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
