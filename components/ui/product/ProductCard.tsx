import React from "react";

interface ProductCardProps {
  name: string;
  price: number;
}

const ProductCard = ({ name, price }: ProductCardProps) => {
  return (
    <div className="flex justify-between  rounded-md p-4">
      <div className="flex gap-4">
        <div className="w-[96px] h-[96px] rounded-sm bg-slate-200">Image</div>
        <div>{name}</div>
      </div>
      <div>{price}</div>
    </div>
  );
};

export default ProductCard;
