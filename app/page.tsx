import Image from "next/image";
import Product from "../Components/Product";

import Link from "next/link";

export default async function Home() {
  const data = await fetch("http://0000:5000/api/product", {
    cache: "no-store",
  });
  let products = await data.json();

  return (
    <div>
      <main>
        <div>
          <h2 className="font-bold sm:text-3xl md:text-4xl text-center m-5 text-yellow-300">Designs made by Ai</h2>
          <div className="flex flex-wrap justify-around">
            {products.map((product: any) => (
              <Link
                key={product.id}
                href={`/${product.id}`}
                className="relative border-4 border-black bg-black rounded-md text-yellow-300 m-3 hover:border-black hover:bg-yellow-300 hover:text-black"
              >
                <Product product={product} size={{ width: 300, height: 300 }} />
                <div className="p-2">
                  <h3 className="font-bold text-xl">{product.designName}</h3>
                  <p className="text-lg">{product.piecePrice} $</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
