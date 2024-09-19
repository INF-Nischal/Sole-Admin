"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "@/components/custom/CustomInput";
import CustomStatusSelect from "@/components/custom/CustomStatusSelect";
import CustomTextarea from "@/components/custom/CustomTextarea";
import { addCategory } from "@/lib/actions/Category";
import { useRouter } from "next/navigation";
import { useToast } from "../use-toast";
import { TImage } from "@/types/Image";
import Image from "next/image";
import ImageLibrary from "../imageLibrary/ImageLibrary";

const formSchema = z.object({
  categoryName: z.string(),
  categoryStatus: z.string(),
  categoryImageURL: z.string(),
  categoryDescription: z.string(),
});

const CategoryForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<TImage>();

  const handleSelectedImage = (img: TImage) => {
    setSelectedImage(img);
    setShowDialog(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
      categoryStatus: "",
      categoryImageURL: "",
      categoryDescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (selectedImage) {
      values.categoryImageURL = selectedImage._id;
    }

    const response = await addCategory(values);

    if (response.success) {
      toast({
        title: "Category Added",
        description: response.message,
        duration: 3000,
      });

      router.push("/dashboard/category");
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
    { _id: "1", status: "Active" },
    { _id: "2", status: "Inactive" },
  ];

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CustomInput
            form={form}
            name="categoryName"
            label="Category Name"
            placeholder="E.g Electronics"
          />
          <CustomStatusSelect
            form={form}
            name="categoryStatus"
            label="Category Status"
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
          <CustomTextarea
            form={form}
            name="categoryDescription"
            label="Category Description"
            placeholder="E.g. Electronics"
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

export default CategoryForm;
