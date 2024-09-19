"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";

import { Category } from "@/types/Category";
import { getAllCategories } from "@/lib/actions/Category";
import CustomInput from "@/components/custom/CustomInput";
import CustomSelect from "@/components/custom/CustomSelect";
import CustomTextarea from "@/components/custom/CustomTextarea";
import CustomStatusSelect from "@/components/custom/CustomStatusSelect";
import { Product } from "@/types/Product";
import { updateProductById } from "@/lib/actions/Product";
import { useRouter } from "next/navigation";
import { TImage } from "@/types/Image";
import Image from "next/image";
import ImageLibrary from "../imageLibrary/ImageLibrary";
import { useToast } from "../use-toast";

interface ProductUpdateFormProps {
  product: Product;
}

const formSchema = z.object({
  productName: z.string(),
  productDescription: z.string(),
  productPrice: z.number(),
  productCategory: z.string(),
  productImageUrlList: z.string(),
  productOffer: z.string(),
  productStatus: z.string(),
});

const ProductUpdateForm = ({ product }: ProductUpdateFormProps) => {
  console.log(typeof product.productPrice);

  const router = useRouter();
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<TImage | null>(
    product.productImageUrlList
  );

  const handleSelectedImage = (img: TImage) => {
    setSelectedImage(img);
    setShowDialog(false);
  };

  useEffect(() => {
    async function fetchCategories() {
      const response = await getAllCategories();

      setCategories(response);
    }

    fetchCategories();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: product.productName || "",
      productDescription: product.productDescription || "",
      productPrice: product.productPrice || 0,
      productCategory: product.productCategory?._id || "",
      productImageUrlList: product.productImageUrlList?._id || "",
      productOffer: product.productOffer || "",
      productStatus: product.productStatus || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (selectedImage) {
      values.productImageUrlList = selectedImage._id;
    }

    const response = await updateProductById(product._id, values);

    if (response) {
      toast({
        title: "Product Updated",
        description: response.message,
        duration: 3000,
      });

      router.push("/dashboard/product");
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.message,
        duration: 3000,
      });
    }
  }

  const statusOptions = [
    { _id: "1", status: "in stock" },
    { _id: "2", status: "out of stock" },
  ];

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CustomInput
            form={form}
            name="productName"
            label="Product Name"
            placeholder="E.g Iphone 15"
          />
          <CustomInput
            form={form}
            name="productPrice"
            type="number"
            label="Product Price"
            placeholder="E.g. 999"
          />
          <CustomSelect
            form={form}
            name="productCategory"
            label="Product Category"
            options={categories}
          />
          <CustomStatusSelect
            form={form}
            name="productStatus"
            label="Product Status"
            options={statusOptions}
          />
          <div className="hover:cursor-pointer flex flex-col gap-4">
            <Button
              type="button"
              onClick={() => setShowDialog(true)}
              className="hover:cursor-pointer w-[160px]"
            >
              {selectedImage ? "Change Image" : "Select Image"}
            </Button>
            {selectedImage && (
              <Image
                src={`${selectedImage.url}`}
                alt="image"
                width={120}
                height={120}
                className="object-cover"
              />
            )}
          </div>
          <CustomInput
            form={form}
            name="productOffer"
            label="Product Offer"
            placeholder="E.g. 10% off"
          />
          <CustomTextarea
            form={form}
            name="productDescription"
            label="Product Description"
            placeholder="E.g. Latest model with A16 chip"
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <ImageLibrary
        showDialog={showDialog}
        handleSelectedImage={handleSelectedImage}
      />
    </div>
  );
};

export default ProductUpdateForm;
