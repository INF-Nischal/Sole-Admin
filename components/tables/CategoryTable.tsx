"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteCategoryById } from "@/lib/actions/Category";
import { Category } from "@/types/Category";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

interface CategoryTableProps {
  categories: Category[];
}

const CategoryTable = ({ categories }: CategoryTableProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleEdit = (id: string) => {
    router.push(`/dashboard/category/${id}`);
  };

  const handleDelete = async (id: string) => {
    const response = await deleteCategoryById(id);

    if (response.success) {
      toast({
        title: "Category Added",
        description: response.message,
        duration: 3000,
      });

      router.refresh();
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.message,
        duration: 3000,
      });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category Name</TableHead>
          <TableHead>Category Status</TableHead>
          <TableHead className="text-right">Edit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category._id}>
            <TableCell className="font-medium">
              {category.categoryName}
            </TableCell>
            <TableCell>{category.categoryStatus}</TableCell>
            <TableCell>
              <div className="flex gap-4 justify-end">
                <button onClick={() => handleDelete(category._id)}>
                  <Image
                    src={"/icons/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </button>
                <button onClick={() => handleEdit(category._id)}>
                  <Image
                    src={"/icons/edit.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
