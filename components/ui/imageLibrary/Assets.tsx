"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getImages } from "@/lib/actions/Image";
import { TImage } from "@/types/Image";

interface AssetsProps {
  handleSelectedImage: (img: TImage) => void;
}

const Assets = ({ handleSelectedImage }: AssetsProps) => {
  const [images, setImages] = useState<TImage[]>([]);

  useEffect(() => {
    async function fetchImages() {
      const response = await getImages();

      setImages(response);
    }

    fetchImages();
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4">
        {images.map((image: TImage) => (
          <div
            key={image._id}
            onClick={() => {
              handleSelectedImage(image);
            }}
            className="cursor-pointer"
          >
            <Image
              src={image.url}
              alt="image"
              width={120}
              height={120}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assets;
