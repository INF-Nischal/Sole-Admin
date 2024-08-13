import { getAllProduct } from "@/lib/actions/Product";
import React from "react";
import ProductTable from "@/components/tables/ProductTable";
import Link from "next/link";

const Products = async () => {
  const products = await getAllProduct();

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-lg font-bold">Products</h1>
        <Link
          href="/dashboard/product/addProduct"
          className="bg-blue-500 rounded-md px-6 py-3 text-white font-semibold"
        >
          Add New Product
        </Link>
      </div>
      <ProductTable products={products} />
    </div>
  );
};

export default Products;
