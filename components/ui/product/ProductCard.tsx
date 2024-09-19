import Image from "next/image";
import React from "react";

interface ProductCardProps {
  imageUrl: string;
  name: string;
  quantity: number;
  price: number;
}

const ProductCard = ({ imageUrl, name, quantity, price }: ProductCardProps) => {
  return (
    <div className="flex gap-8 rounded-md p-4">
      <div className="w-[96px] h-[96px] rounded-sm bg-slate-200">
        <Image src={`${imageUrl}`} alt="product image" width={96} height={96} />
      </div>
      <div className="w-full flex justify-between items-center gap-6">
        <span className="text-lg font-semibold">{name}</span>
        <span className="font-semibold">Qty: {quantity}</span>
        <span className="text-xl font-bold">{price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
