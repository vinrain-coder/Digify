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

      {/* Responsive headings for small devices */}
      <div className="flex justify-between text-xs pb-2 items-center mt-8 font-semibold">
        <div>PRODUCT</div>
        <div className="hidden md:flex ml-[240px]">QUANTITY</div>
        <div>TOTAL</div>
      </div>

      <div className="flex flex-col mt-4 gap-4">
        {cartProducts.map((item) => (
          <ItemContent key={item.id} item={item} />
        ))}
      </div>

      <div className="border-t border-slate-200 py-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="w-32">

          <Button
            label="Clear Cart"
            onClick={handleClearCart}
            small
            outline
          />
          </div>
          <div className="text-sm flex flex-col items-start">
            <div className="flex justify-between w-full text-base font-semibold">
              <span>Sub-total</span>
              <span>{formatPrice(cartTotalAmount)}</span>
            </div>
            <p className="text-slate-500">Taxes and shipping calculated at checkout</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-end">
          <Button label="Checkout" custom="md:w-40" onClick={() => {}} />
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1"
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



