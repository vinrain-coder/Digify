// src/app/components/products/SetColor.tsx

"use client";

import React from "react";
import { CartProductType, SelectedImgType } from "@/app/product/[productId]/ProductDetails";

interface SetColorProps {
  images: SelectedImgType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: SelectedImgType) => void;
}

const SetColor: React.FC<SetColorProps> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
  return (
    <div>
      {/* Color Selection */}
      <div className="flex gap-4 items-center">
        <span className="font-semibold">COLOR:</span>
        <div className="flex gap-1">
          {images.map((image) => (
            <div
              key={image.color}
              onClick={() => handleColorSelect(image)}
              className={`h-7 w-7 rounded-full flex items-center justify-center cursor-pointer ${
                cartProduct.selectedImg.color === image.color
                  ? "border-[1.5px] border-teal-500"
                  : "border-none"
              }`}
            >
              <div
                style={{ background: image.colorCode }}
                className="h-5 w-5 rounded-full border-[1.2px] border-slate-300"
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SetColor;


