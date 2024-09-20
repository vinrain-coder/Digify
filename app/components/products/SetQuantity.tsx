"use client";

import { CartProductType } from "@/app/product/[productId]/ProductDetails";

interface SetQuantityProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
}

const btnStyles = "border-[1.2px] border-slate-300 px-2 rounded";

const SetQuantity: React.FC<SetQuantityProps> = ({
  cartProduct,
  cartCounter,
  handleQuantityDecrease,
  handleQuantityIncrease,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold">QUANTITY:</div>}
      <div className="flex gap-4 items-center text-base">
        {/* Decrease button */}
        <button onClick={handleQuantityDecrease} className={btnStyles}>
          -
        </button>
        {/* Quantity display */}
        <div>{cartProduct.quantity}</div>
        {/* Increase button */}
        <button onClick={handleQuantityIncrease} className={btnStyles}>
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
