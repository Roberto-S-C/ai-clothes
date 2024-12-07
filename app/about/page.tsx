"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function About() {
  const images = [
    "/PigBasketball.jpeg",
    "/BoxingGorillas.jpeg",
    "/RedBear.jpeg",
    "/GreenCat.jpeg",
    "/PinkEagle.jpeg",
    "/MmaMonkey.jpeg",
    "/YellowCat.jpeg",
    "/PicassoCat.jpeg",
  ];

  const [displayedImg, setDisplayedImg] = useState(0);
  const [productWidth, setProductWidth] = useState(0);

  useEffect(() => {
    let windowWidth = window.innerWidth;
    if (windowWidth <= 700) {
      setProductWidth((windowWidth * 4) / 5);
    } else if (windowWidth <= 1200) {
      setProductWidth(windowWidth / 2);
    } else {
      setProductWidth(windowWidth / 3);
    }
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-4xl font-bold text-yellow-300 mb-6">About</h2>

      <div className="lg:flex">
        <div className="flex justify-center">
          <div className="relative flex justify-center">
            <div
              onClick={() => {
                if (displayedImg === 0) {
                  setDisplayedImg(images.length - 1);
                } else {
                  setDisplayedImg(displayedImg - 1);
                }
              }}
              className="flex items-center h-full"
            >
              <ArrowLeftIcon className="size-8 cursor-pointer" />
            </div>
            <div className="relative" style={{ width: productWidth }}>
              <Image
                src={"/black-tshirt.jpg"}
                alt="Ai Design"
                width={productWidth}
                height={productWidth}
              />
              <Image
                src={images[displayedImg]}
                alt="Ai Design"
                width={productWidth / 3}
                height={productWidth / 3}
                className="absolute"
                style={{ top: "15%", left: "33%" }}
              />
            </div>
            <div
              onClick={() => {
                if (displayedImg === images.length - 1) {
                  setDisplayedImg(0);
                } else {
                  setDisplayedImg(displayedImg + 1);
                }
              }}
              className="flex items-center h-full"
            >
              <ArrowRightIcon className="size-8 cursor-pointer h-full" />
            </div>
          </div>
        </div>

        <div className="lg:flex-3 md:m-0 lg:ml-5 sm:m-3">
          <div className="flex justify-center space-x-6 m-3">
            <a
              href="https://github.com/Roberto-S-C"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-gray-800 hover:text-black"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/roberto-s%C3%A1nchez-c%C3%A1zares-687b54228/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-blue-700 hover:text-blue-900"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:robertosanchezcazares@gmail.com"
              className="text-3xl text-red-600 hover:text-red-800"
            >
              <FaEnvelope />
            </a>
          </div>
          <p className="text-justify max-w-2xl sm:p-3 md:w-full md:text-lg">
            Welcome to Ai Clothes! My application leverages the power of AI to
            generate unique and creative t-shirt designs. By using the advanced{" "}
            <a
              href="https://getimg.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              getimg.ai
            </a>{" "}
            API, we enable users to create cool and personalized t-shirts
            designed by artificial intelligence. Whether you're looking for a
            one-of-a-kind design or just want to explore the possibilities of
            AI-generated art, Ai Clothes has got you covered.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
