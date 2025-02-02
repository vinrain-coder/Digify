"use client";

import { useCart } from "@/hooks/useCart";
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import Button from "../components/Button";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Create a payment intent as soon as the page loads
    if (cartProducts.length > 0) {
      setLoading(true);
      setError(false);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            return router.push("/login");
          }
          return res.json();
        })
        .then((data) => {
          if (data.paymentIntent) {
            setClientSecret(data.paymentIntent.client_secret);
            handleSetPaymentIntent(data.paymentIntent.id);
          } else {
            setError(true);
            toast.error("Failed to create payment intent");
          }
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
          console.error("Error", error);
          toast.error("Something went wrong");
        });
    }
  }, [cartProducts, paymentIntent, handleSetPaymentIntent, router]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      labels: 'floating'
    }
  };

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <div className='w-full'>
      {clientSecret && cartProducts.length > 0 && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} handleSetPaymentSuccess={handleSetPaymentSuccess} />
        </Elements>
      )}
      {loading && <div className='text-center'>Loading Checkout</div>}
      {error && <div className='text-center text-rose-400'>Something went wrong</div>}
      {paymentSuccess && (
        <div className='flex items-center flex-col gap-4'>
          <div className='text-teal-500 text-center'>Payment Success</div>
          <div className='max-w-[220px] w-full'>
            <Button label='View your orders' onClick={() => router.push('/order')} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;
