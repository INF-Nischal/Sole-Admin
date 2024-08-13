"use client";

import React from "react";
import Assets from "./Assets";
import ImageUpload from "./ImageUpload";
import { TImage } from "@/types/Image";

interface ImageLibraryProps {
  showDialog: boolean;
  handleSelectedImage: (img: TImage) => void;
}

const ImageLibrary = ({
  showDialog,
  handleSelectedImage,
}: ImageLibraryProps) => {
  const [showAssets, setShowAssets] = React.useState(true);
  const [showUpload, setShowUpload] = React.useState(false);

  return (
    <div>
      {showDialog && (
        <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center border-2">
          <div className=" p-4 rounded-md bg-slate-200">
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowAssets(true);
                  setShowUpload(false);
                }}
                className={`${showAssets ? "border-b-2 border-blue-400" : ""}`}
              >
                Assets
              </button>
              <button
                onClick={() => {
                  setShowAssets(false);
                  setShowUpload(true);
                }}
                className={`${showUpload ? "border-b-2 border-blue-400" : ""}`}
              >
                Upload
              </button>
            </div>
            <div className="mt-4">
              {showAssets && (
                <Assets handleSelectedImage={handleSelectedImage} />
              )}
              {showUpload && <ImageUpload />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageLibrary;
