"use client"

import CheckoutForm from "./CheckoutForm";
import { useCart } from "@/hooks/useCart"; // Correct import

const CheckoutPage = () => {
  const { cartTotalAmount } = useCart(); // Get total amount from the cart context

  return (
    <div>
      <h1>Checkout</h1>
      <p>Total Amount: KES {cartTotalAmount}</p>
      <CheckoutForm totalAmount={cartTotalAmount} />
    </div>
  );
};

export default CheckoutPage;

