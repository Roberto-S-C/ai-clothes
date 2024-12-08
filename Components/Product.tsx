import React from "react";
import Image from "next/image";

function Product({ product, size }) {
  return (
    <div className="flex">
      <div className={`relative w-${size.width} h-${size.height} m-5`}>
        <Image
          src={`http://0000:5000${product.pieceImage}`}
          width={size.width}
          height={size.height}
          alt={`${product.designName} ${product.pieceName}`}
          className="relative"
        />
        <Image
          src={`http://0000:5000${product.designImage}`}
          width={size.width / 3}
          height={size.height / 3}
          alt={product.designName}
          className="absolute"
          style={{
            left: "33%",
            top: "15%",
          }}
        />
      </div>
    </div>
  );
}

export default Product;
