"use client";

import { CpuChipIcon } from "@heroicons/react/20/solid";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { HashLoader } from "react-spinners";
import { useForm } from "react-hook-form";

async function Create() {
  const [design, setDesign] = useState(null);
  const [designImage, setDesignImage] = useState("/image.png");

  // const [pieces, setPieces] = useState([]);
  const [currentPiece, setCurrentPiece] = useState(null);

  const [cookies, setCookie] = useCookies(["token"]);

  const router = useRouter();

  const [productWidth, setProductWidth] = useState(0);

  const [loading, setLoading] = useState(true);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const data = await fetch("http://localhost:5000/api/product", {
    cache: "no-store",
  });
  let pieces = await data.json();
  console.log(pieces);

  useEffect(() => {
    let windowWidth = window.innerWidth;
    if (windowWidth <= 700) {
      setProductWidth((windowWidth * 4) / 5);
    } else if (windowWidth <= 1200) {
      setProductWidth(windowWidth / 2);
    } else {
      setProductWidth(windowWidth / 3);
    }

    // fetch("http://localhost:5000/api/piece", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setPieces(data);
    //     setCurrentPiece(data[0]);
    //     setLoading(false);
    //   });
  }, []);

  const createDesign = (data) => {
    setLoading(true);

    if (!cookies.token) {
      return router.push("/login");
    }

    let { designName, prompt } = data;

    fetch("http://localhost:5000/api/design", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: designName, prompt }),
    })
      .then((response) => response.json())
      .then((d) => {
        setDesignImage(`http://localhost:5000${d.image}`);
        setDesign(d);
        setLoading(false);
      });
  };

  const createProduct = () => {
    if (design && currentPiece) {
      let pieceId = currentPiece.id;
      let designId = design.id;

      if (!cookies.token) {
        return router.push("/login");
      }

      fetch("http://localhost:5000/api/product", {
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
    <div>
      <div
        className={`flex flex-col justify-center lg:flex-row lg:justify-center`}
      >
        {loading === true ? (
          <div
            className="flex justify-center items-center"
            style={{ margin: 150 }}
          >
            <HashLoader size={50} color={"#fcd34d"} loading={true} />
          </div>
        ) : (
          <div className={`flex justify-center relative my-3`}>
            <div className="relative">
              {currentPiece && (
                <Image
                  src={`http://localhost:5000${currentPiece.image}`}
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
                    left: "33%",
                    top: "15%",
                  }}
                />
              )}
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit(createDesign)}
          className="flex flex-col items-center justify-center lg:w-1/2"
        >
          <input
            type="text"
            id="designName"
            name="designName"
            maxLength={30}
            placeholder="Name of your design"
            className="w-3/5 md:w-1/3 lg:w-2/5 mb-3 border-2 rounded border-black bg-yellow-300 placeholder:text-black"
            {...register("designName", { required: true, maxLength: 30 })}
            aria-invalid={errors.designName ? "true" : "false"}
          />
          {errors.designName?.type === "required" && (
            <p role="alert" className="text-red-600 mb-3">
              Design name is required
            </p>
          )}
          <div className="flex items-center justify-center cursor-pointer">
            {pieces.map((piece) => {
              return (
                <div key={piece.id} onClick={() => setCurrentPiece(piece)}>
                  <Image
                    src={`http://localhost:5000${piece.image}`}
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
                name="prompt"
                placeholder="How would you like your t-shirt to look..."
                rows={8}
                maxLength={500}
                className="border-2 sm:w-5/6 max-w-full mt-3 border-black bg-yellow-300 rounded placeholder:text-black"
                {...register("prompt", { required: true, maxLength: 500 })}
                aria-invalid={errors.prompt ? "true" : "false"}
              />
              {errors.prompt?.type === "required" && (
                <p role="alert" className="text-red-600">
                  Prompt is required
                </p>
              )}

              <div className="flex justify-around mt-3">
                <div className="flex items-center mx-2 bg-yellow-300 border-2 border-black rounded hover:bg-black hover:text-yellow-300 cursor-pointer p-3">
                  <input
                    type="submit"
                    className="text-center text-xl font-bold cursor-pointer"
                    value={"Generate"}
                  />
                  <CpuChipIcon className="size-6 text-sm mx-3" />
                </div>
                <div className="mx-2">
                  <div
                    className="flex bg-yellow-300 text-center text-xl border-2 border-black  font-bold rounded hover:bg-black hover:text-yellow-300 cursor-pointer p-3"
                    onClick={() => createProduct()}
                  >
                    Next
                    <ChevronRightIcon className="size-6 text-sm mx-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
