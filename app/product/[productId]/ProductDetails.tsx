"use client";

import React, { useCallback, useEffect, useState } from "react";
import SetColor from "@/app/components/products/SetColor";
import { Rating } from "@mui/material";
import SetQuantity from "@/app/components/products/SetQuantity";
import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import ProductDescription from "./ProductDescription";
import { useCart } from "@/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    images?: {
      color: string;
      colorCode: string;
      imageUrl: string; // Original data has 'imageUrl'
    }[];
    reviews: { rating: number }[];
    price: number;
    inStock: boolean;
  };
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-[30%] my-1" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);

  // Normalize images to match SelectedImgType[]
  const normalizedImages = Array.isArray(product.images)
    ? product.images.map((img) => ({
        color: img.color,
        colorCode: img.colorCode,
        image: img.imageUrl, // Rename 'imageUrl' to 'image'
      }))
    : [];

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: normalizedImages.length
      ? normalizedImages[0]
      : { color: "", colorCode: "", image: "" },
    quantity: 1,
    price: product.price,
  });

  const router = useRouter();

  useEffect(() => {
    if (cartProducts && product) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      setIsProductInCart(existingIndex > -1);
    }
  }, [cartProducts, product]);

  const productRating =
    product.reviews.length > 0
      ? product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length
      : 0;

  const handleColorSelect = useCallback((value: SelectedImgType) => {
    setCartProduct((prev) => ({
      ...prev,
      selectedImg: value,
    }));
  }, []);

  const handleQuantityIncrease = useCallback(() => {
    setCartProduct((prev) => {
      if (prev.quantity < 20) {
        return { ...prev, quantity: prev.quantity + 1 };
      }
      return prev;
    });
  }, []);

  const handleQuantityDecrease = useCallback(() => {
    setCartProduct((prev) => {
      if (prev.quantity > 1) {
        return { ...prev, quantity: prev.quantity - 1 };
      }
      return prev;
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Product Image Section */}
      <ProductImage
        cartProduct={cartProduct}
        product={{ ...product, images: normalizedImages }} // Pass normalized images
        handleColorSelect={handleColorSelect}
      />

      {/* Product Details Section */}
      <div className="flex flex-col gap-2 text-slate-500 text-small lg:mt-10">
        {/* Product Name and Rating */}
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal />

        {/* Product Description with "Show More/Show Less" */}
        <div className="text-justify">
          <ProductDescription description={product.description} />
        </div>
        <Horizontal />

        {/* Product Category and Brand */}
        <div className="font-semibold">
          <span>CATEGORY: </span>
          {product.category}
        </div>
        <div className="font-semibold">
          <span>BRAND: </span>
          {product.brand}
        </div>

        {/* Stock Information */}
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "In Stock" : "Out of Stock"}
        </div>
        <Horizontal />

        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle className="text-teal-400" size={20} />
              <span> Product added to cart </span>
            </p>
            <div className="max-w-[300px]">
              <Button
                label="View Cart"
                outline
                onClick={() => {
                  router.push("/cart");
                }}
              />
            </div>
          </>
        ) : (
          <>
            {/* Color Selector */}
            <SetColor
              cartProduct={cartProduct}
              images={normalizedImages}
              handleColorSelect={handleColorSelect}
            />
            <Horizontal />

            {/* Quantity Selector */}
            <SetQuantity
              cartProduct={cartProduct}
              handleQuantityDecrease={handleQuantityDecrease}
              handleQuantityIncrease={handleQuantityIncrease}
            />
            <Horizontal />

            {/* Add to Cart Button */}
            <div className="max-w-[300px]">
              <Button
                outline
                label={product.inStock ? "Add to Cart" : "Out of Stock"} // Change label if out of stock
                onClick={() => product.inStock && handleAddProductToCart(cartProduct)}
                disabled={!product.inStock} // Disable button if out of stock
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
