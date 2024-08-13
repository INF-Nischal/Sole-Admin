import CategoryUpdateForm from "@/components/ui/category/CategoryUpdateForm";
import { getCategoryById } from "@/lib/actions/Category";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const category = await getCategoryById(params.id);

  return (
    <div>
      {<h1>Category ID: {params.id}</h1>}
      <CategoryUpdateForm category={category} />
    </div>
  );
};

export default page;
