import Image from "next/image";
import Product from "../Components/Product";

import Link from "next/link";

export default async function Home() {
  const data = await fetch("http://localhost:5251/api/product", {
    cache: "no-store",
  });
  let products = await data.json();

  return (
    <div>
      <main>
        <div>
          <h2 className="text-black font-bold text-3xl">Designs made by Ai</h2>
          <div className="flex flex-wrap justify-around">
            {products.map((product: any) => (
              <Link
                key={product.id}
                href={`/${product.id}`}
                className="relative border-2 border-yellow-300 rounded"
              >
                <Product product={product} size={{ width: 300, height: 300 }} />
                <div>
                  <h3>{product.designName}</h3>
                  <p>{product.piecePrice} $</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
