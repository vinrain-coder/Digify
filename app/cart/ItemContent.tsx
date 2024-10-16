"use client";

import { formatPrice } from "@/utils/formatPrice";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { MdDelete } from "react-icons/md"; // React icon for remove

interface ItemContentProps {
  item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {
    handleRemoveProductFromCart,
    handleCartQuantityIncrease,
    handleCartQuantityDecrease,
  } = useCart();

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 text-sm gap-2 border-t-[1.5px] border-slate-200 py-4 items-start p-2">
      {/* First column: Image */}
      <div className="relative w-[70px] aspect-square">
        <Link href={`/product/${item.id}`}>
          <Image
            src={item.selectedImg.image}
            alt={item.name}
            fill
            className="object-contain"
          />
        </Link>
      </div>

      {/* Second column: Product details */}
      <div className="flex flex-col justify-between gap-1">
        <Link href={`/product/${item.id}`}>{truncateText(item.name)}</Link>
        <div className="text-slate-500">{item.selectedImg.color}</div>
        <div className="text-slate-500"> {formatPrice(item.price)}</div>
        <div className="mt-1 flex gap-1 justify-between items-center md:hidden">
          Qty:
          <SetQuantity
            cartCounter={true}
            cartProduct={item}
            handleQuantityIncrease={() => handleCartQuantityIncrease(item)}
            handleQuantityDecrease={() => handleCartQuantityDecrease(item)}
          />
        </div>
      </div>

      <div className="hidden md:flex justify-between gap-1">
        <div className="mt-1 gap-1 justify-between items-center ml-[80px]">
          <SetQuantity
            cartCounter={true}
            cartProduct={item}
            handleQuantityIncrease={() => handleCartQuantityIncrease(item)}
            handleQuantityDecrease={() => handleCartQuantityDecrease(item)}
          />
        </div>
      </div>

      {/* Third column: Total price and remove icon */}
      <div className="flex flex-col justify-between items-end">
        <div className="font-semibold">
          {formatPrice(item.price * item.quantity)}
        </div>
        <button
          className="text-red-500 hover:text-red-700 mt-10"
          onClick={() => handleRemoveProductFromCart(item)}
        >
          <MdDelete size={20} />
        </button>
      </div>
    </div>
  );
};

export default ItemContent;
