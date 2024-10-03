"use client";

import { useState } from "react";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import Button from "../components/Button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useCart } from "@/hooks/useCart";
import PersonalDetailsForm from "./PersonalDetailsForm";
import AddressForm from "./AddressForm";
import ShippingOptions from "./ShippingOptions";
import OrderSummary from "./OrderSummary";
import PaymentOptions from "./PaymentOptions";

const Checkout = () => {
  const { cartProducts, cartTotalAmount } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    // Process the form data (e.g., send to API)
    console.log("Submitted Data:", data);
    setIsLoading(false);
  };

  return (
    <div>
      <Container>
        <FormWrap>
          {/* Personal Details */}
          <div className="mb-8">
            <PersonalDetailsForm onSubmit={handleFormSubmit} />
          </div>

          {/* Address Details */}
          <div className="mb-8">
            <AddressForm onSubmit={handleFormSubmit} />
          </div>

          {/* Shipping Options */}
          <div className="mb-8">
            <ShippingOptions />
          </div>

          {/* Order Summary */}
          <div className="mb-8">
            <OrderSummary
              cartProducts={cartProducts}
              totalAmount={cartTotalAmount}
            />
          </div>

          {/* Payment Options */}
          <div className="mb-8">
            <PaymentOptions />
          </div>

          {/* Submit Button */}
          <Button
            label={isLoading ? "Processing..." : "Place Order"}
            disabled={isLoading}
            onClick={handleFormSubmit}
            custom="mt-4"
          />
        </FormWrap>
      </Container>
    </div>
  );
};

export default Checkout;
