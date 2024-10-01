"use client";

import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  data: {
    id: string;
    name: string;
    reviews: { rating: number }[];
    price: number;
    images: { imageUrl: string }[]; // Update to match your image structure
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();

  const productRating =
    data.reviews.length > 0
      ? data.reviews.reduce(
          (acc: number, item: { rating: number }) => item.rating + acc,
          0
        ) / data.reviews.length
      : 0; // Handle case where there are no reviews

  const imageUrl =
    data.images.length > 0 ? data.images[0].imageUrl : "/default-image.jpg"; // Fallback to a default image

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-md p-2 transition hover:scale-105 text-center text-sm"
    >
      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            fill
            src={imageUrl}
            alt={data.name}
            className="w-full h-full object-contain"
            priority // Load images with priority
          />
        </div>
        <div className="mt-4">{truncateText(data.name)}</div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>{data.reviews.length} reviews</div>
        <div className="font-semibold">{formatPrice(data.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
