import CategoryTable from "@/components/tables/CategoryTable";
import { getAllCategories } from "@/lib/actions/Category";
import Link from "next/link";

const Categories = async () => {
  const categories = await getAllCategories();

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-lg font-bold">Categories</h1>
        <Link
          href="/dashboard/category/addCategory"
          className="bg-blue-500 rounded-md px-6 py-3 text-white font-semibold"
        >
          Add New Category
        </Link>
      </div>
      <CategoryTable categories={categories} />
    </div>
  );
};

export default Categories;
