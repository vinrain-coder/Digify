"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import Button from "../components/Button";
import Link from "next/link";
import { SafeUser } from "@/types";

interface RegisterFormProps {
  currentUser: SafeUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, [currentUser, router]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/register", data);
      if (response.status === 200) {
        toast.success(response.data.message || "Registration successful! Please verify your email.");
        router.push("/login");
      } else {
        throw new Error(response.data.error || "Registration failed");
      }
    } catch (error: any) {
      // Use optional chaining to handle cases where response is undefined
      const errorMessage = error?.response?.data?.error || "Something went wrong during registration.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return currentUser ? (
    <p className="text-center">Logged in. Redirecting...</p>
  ) : (
    <>
      <Heading title="Sign up for Shoepedi" />
      <hr className="bg-slate-300 w-full h-px" />
      <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
      <Input id="password" label="Password" disabled={isLoading} register={register} errors={errors} required type="password" />
      <Button label={isLoading ? "Loading..." : "Sign Up"} onClick={handleSubmit(onSubmit)} disabled={isLoading} />
      <p className="text-sm">
        Already have an account?{" "}
        <Link className="underline" href="/login">Login</Link>
      </p>
    </>
  );
};

export default RegisterForm;


