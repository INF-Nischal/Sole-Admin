"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteProductById } from "@/lib/actions/Product";
import { Product } from "@/types/Product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

interface ProductTableProps {
  products: Product[];
}

const ProductTable = ({ products }: ProductTableProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleEdit = (id: string) => {
    router.push(`/dashboard/product/${id}`);
  };

  const handleDelete = async (id: string) => {
    const response = await deleteProductById(id);

    if (response.success) {
      toast({
        title: "Product Deleted",
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
          <TableHead>Product Name</TableHead>
          <TableHead className="text-center">Product Price</TableHead>
          <TableHead className="text-center">Product Sold</TableHead>
          <TableHead className="text-center">Product Status</TableHead>
          <TableHead className="text-right">Edit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product._id}>
            <TableCell className="font-medium">{product.productName}</TableCell>
            <TableCell className="text-center">
              {product.productPrice}
            </TableCell>
            <TableCell className="text-center">{product.productSold}</TableCell>
            <TableCell className="text-center">
              {product.productStatus}
            </TableCell>
            <TableCell>
              <div className="flex gap-4 justify-end">
                <button onClick={() => handleDelete(product._id)}>
                  <Image
                    src={"/icons/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </button>
                <button onClick={() => handleEdit(product._id)}>
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

export default ProductTable;
