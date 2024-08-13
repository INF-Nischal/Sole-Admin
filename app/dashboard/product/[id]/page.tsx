import ProductUpdateForm from "@/components/ui/product/ProductUpdateForm";
import { getProductById } from "@/lib/actions/Product";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const product = await getProductById(params.id);

  return (
    <div>
      <ProductUpdateForm product={product} />
    </div>
  );
};

export default page;
