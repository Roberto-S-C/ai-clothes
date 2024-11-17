"use client";

import { CpuChipIcon } from "@heroicons/react/20/solid";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

function Create() {
  const [design, setDesign] = useState(null);
  const [designImage, setDesignImage] = useState("/image.png");

  const [name, setName] = useState(null);
  const [prompt, setPrompt] = useState(null);

  const [pieces, setPieces] = useState([]);
  const [currentPiece, setCurrentPiece] = useState(null);

  const [cookies, setCookie] = useCookies(["token"]);

  const router = useRouter();

  const [productWidth, setProductWidth] = useState(0);

  useEffect(() => {
    setProductWidth(window.innerWidth / 3);

    fetch("http://localhost:5251/api/piece")
      .then((response) => response.json())
      .then((data) => {
        setPieces(data);
        setCurrentPiece(data[0]);
      });
  }, []);

  const createDesign = () => {
    if (!cookies.token) {
      return router.push("/login");
    }

    fetch("http://localhost:5251/api/design", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, prompt, userId: 1 }),
    })
      .then((response) => response.json())
      .then((data) => {
        setDesignImage(`http://localhost:5251${data.image}`);
        setDesign(data);
      });
  };

  const createProduct = () => {
    if (design && currentPiece) {
      let pieceId = currentPiece.id;
      let designId = design.id;

      if (!cookies.token) {
        return router.push("/login");
      }

      fetch("http://localhost:5251/api/product", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pieceId, designId }),
      })
        .then((response) => response.json())
        .then((data) => router.push(`/${data.id}`));
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`flex flex-col justify-center w-${productWidth} h-${productWidth}`}>
        <div className="flex justify-center relative my-3">
          {currentPiece && (
            <Image
              src={`http://localhost:5251${currentPiece.image}`}
              width={productWidth}
              height={productWidth}
              alt={`${currentPiece.color} ${currentPiece.name}`}
            />
          )}

          {designImage && (
            <Image
              src={designImage}
              width={productWidth / 3}
              height={productWidth / 3}
              alt="design"
              className={"absolute"}
              style={{
                left: "36%",
                top: "15%",
              }}
            />
          )}
        </div>

        <div className="flex flex-col items-center justify-center">
          <input
            type="text"
            id="name"
            placeholder="Name of your t-shirt..."
            onChange={(e) => setName(e.target.value)}
            className="border-2 w-1/2 mb-3 rounded border-black bg-yellow-300 placeholder:text-black"
          />
          <div className="flex items-center justify-center">
            {pieces.map((piece) => {
              return (
                <div key={piece.id} onClick={() => setCurrentPiece(piece)}>
                  <Image
                    src={`http://localhost:5251${piece.image}`}
                    width={100}
                    height={100}
                    alt={`${piece.color} ${piece.name}`}
                    className="mx-2"
                  />
                </div>
              );
            })}
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col items-center">
              <textarea
                id="prompt"
                placeholder="How would you like your t-shirt to look..."
                rows={8}
                cols={50}
                className="border-2 mt-3 border-black bg-yellow-300 rounded placeholder:text-black"
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="flex justify-around mt-3">
                <div className="mx-2">
                  <button
                    className="flex bg-yellow-300 text-center text-xl border-2 border-black font-bold rounded p-3"
                    onClick={() => createDesign()}
                  >
                    Generate <CpuChipIcon className="size-6 text-sm mx-3" />
                  </button>
                </div>
                <div className="mx-2">
                  <button
                    className="flex bg-yellow-300 text-center text-xl border-2 border-black  font-bold rounded p-3"
                    onClick={() => createProduct()}
                  >
                    Next
                    <ChevronRightIcon className="size-6 text-sm mx-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
