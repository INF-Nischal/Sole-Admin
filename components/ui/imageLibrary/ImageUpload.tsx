"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { uploadImage } from "@/lib/actions/Image";
import { Button } from "../button";

const ImageUpload: React.FC = () => {
  const [file, setFile] = useState<string | ArrayBuffer | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const selectedFile = e.target.files?.[0];

    reader.onloadend = () => {
      setFile(reader.result);
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select an image to upload.");
      return;
    }

    const response = await uploadImage(file as string);

    if (response) {
      setMessage("Image uploaded successfully.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center">
          <label
            htmlFor="image"
            className="w-full h-[120px] border-2 border-dotted border-blue-400 rounded-md flex justify-center items-center cursor-pointer"
          >
            Select an image to upload:
          </label>
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <Button type="submit" className="mt-5 w-full">
          Upload Image
        </Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUpload;
