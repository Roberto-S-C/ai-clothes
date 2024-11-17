"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Product from "../../Components/Product";

function ProductPage() {
  const [product, setProduct] = useState(null);

  const params = useParams();

  const productWidth = window.innerWidth / 3;

  useEffect(() => {
    fetch(`http://localhost:5251/api/product/${params.product}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);

  return (
    <div>
      <div className={`w-${productWidth}`}>
        {product && (
          <div className="flex">
            <Product
              product={product}
              size={{ width: productWidth, height: productWidth }}
            />
            <div>
              <h3>{product.designName}</h3>
              <div>
                <p>Promt</p> 
                <p>{product.designPrompt}</p>
              </div>
              <p>{product.piecePrice} $</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
