"use client";

import {
  CartProductType,
  SelectedImgType,
} from "@/app/product/[productId]/ProductDetails";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: SelectedImgType) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex flex-col gap-4 w-full lg:w-3/5">
        <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px]">
          <Zoom>
            <Image
              src={cartProduct.selectedImg.image}
              alt={cartProduct.name}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain rounded-lg"
              priority
            />
          </Zoom>
        </div>

        <div className="flex flex-row lg:hidden justify-center gap-2 sm:gap-4 overflow-x-auto max-h-[100px] mt-4">
          {product.images.map((image: SelectedImgType) => (
            <div
              key={image.color}
              onClick={() => handleColorSelect(image)}
              className={`relative w-[60px] sm:w-[80px] aspect-square rounded-lg border ${
                cartProduct.selectedImg.color === image.color
                  ? "border-teal-300 border-[2px]"
                  : "border-transparent"
              } cursor-pointer`}
            >
              <Image
                src={image.image}
                alt={image.color}
                fill
                sizes="80px"
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="hidden lg:flex flex-col lg:ml-20 gap-4 justify-center">
        {product.images.map((image: SelectedImgType) => (
          <div
            key={image.color}
            onClick={() => handleColorSelect(image)}
            className={`relative w-[60px] lg:w-[80px] aspect-square rounded-lg border ${
              cartProduct.selectedImg.color === image.color
                ? "border-teal-300 border-[2px]"
                : "border-transparent"
            } cursor-pointer`}
          >
            <Image
              src={image.image}
              alt={image.color}
              fill
              sizes="80px"
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
