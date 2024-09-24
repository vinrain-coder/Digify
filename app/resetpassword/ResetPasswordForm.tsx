"use client";

import { useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const ResetPasswordForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      code: "",
      newPassword: "",
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/reset-password", data)
      .then(() => {
        toast.success("Password reset successful");
        router.push("/login");
        router.refresh();
      })
      .catch(() => {
        toast.error("Failed to reset password");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Heading title="Reset Your Password" />
      <Input
        id="code"
        label="6-Digit Code"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        
        
        
      />
      <Input
        id="newPassword"
        label="New Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        
      />
      <Button
        label={isLoading ? "Loading..." : "Reset Password"}
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
    </>
  );
};

export default ResetPasswordForm;

