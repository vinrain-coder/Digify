"use client";

import { useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

interface CheckoutFormProps {
  totalAmount: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ totalAmount }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      phone: '',
    },
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/mpesa/stkPush', { 
        phone: data.phone, 
        amount: totalAmount 
      });
      toast.success("STK Push initiated. Please check your phone.");
      router.push('/cart');
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Payment failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          type="text"
          {...register('phone', { 
            required: 'Phone number is required', 
            pattern: { 
              value: /^[0-9]{10}$/, // Kenyan phone numbers have 10 digits
              message: 'Invalid phone number format' 
            } 
          })}
          disabled={isLoading}
        />
        {/* {errors.phone && <span>{errors?.phone?.message}</span>} */}
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Checkout'}
      </button>
    </form>
  );
};

export default CheckoutForm;

