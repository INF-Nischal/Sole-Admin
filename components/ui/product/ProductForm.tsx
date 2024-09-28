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
import { addProduct } from "@/lib/actions/Product";
import { useRouter } from "next/navigation";
import ImageLibrary from "../imageLibrary/ImageLibrary";
import { TImage } from "@/types/Image";
import Image from "next/image";
import { useToast } from "../use-toast";

const formSchema = z.object({
  productName: z.string(),
  productDescription: z.string(),
  productPrice: z.number(),
  productCategory: z.string(),
  productImageUrlList: z.string(),
  productOffer: z.string(),
  productStatus: z.string(),
});

const ProductForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<TImage>();

  const handleSelectedImage = (img: TImage) => {
    setSelectedImage(img);
    setShowDialog(false);
  };

  const handleShowDialog = () => {
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
      productName: "",
      productDescription: "",
      productPrice: 0,
      productCategory: "",
      productImageUrlList: "",
      productOffer: "",
      productStatus: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (selectedImage) {
      values.productImageUrlList = selectedImage._id;
    }

    const response = await addProduct(values);

    if (response.success) {
      toast({
        title: "Product Added",
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
          <div className="flex flex-col gap-4 hover:cursor-pointer">
            <Button
              type="button"
              onClick={() => setShowDialog(true)}
              className="w-[160px] hover:cursor-pointer"
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
        handleShowDialog={handleShowDialog}
        handleSelectedImage={handleSelectedImage}
      />
    </div>
  );
};

export default ProductForm;
