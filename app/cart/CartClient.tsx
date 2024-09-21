"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";

const CartClient = () => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your cart is empty</div>
        <div>
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2 cursor-pointer"
          >
            <MdArrowBack />
            <span>Start shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 md:p-8">
      <Heading title="Shopping Cart" center />
      <div className="grid grid-cols-1 md:grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-center">QUANTITY</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts.map((item) => (
          <ItemContent key={item.id} item={item} />
        ))}
      </div>
      <div className="border-t border-slate-200 py-4 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex justify-center md:justify-start">
          <Button label="Clear Cart" onClick={handleClearCart} small outline />
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full text-base font-semibold">
            <span>Sub-total</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className="text-slate-500">Taxes and shipping calculated at checkout</p>
          <Button label="Checkout" onClick={() => {}} />
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2 cursor-pointer"
          >
            <MdArrowBack />
            <span>Continue shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;

