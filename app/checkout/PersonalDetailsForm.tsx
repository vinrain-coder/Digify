import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Input from "../components/inputs/Input";

interface PersonalDetailsFormProps {
  onSubmit: SubmitHandler<FieldValues>;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  return (
    <div className="w-full p-4 border border-gray-200 rounded-lg bg-white shadow-md">
      <h4 className="text-md font-semibold mb-4">Personal Details</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:min-w-[500px] flex flex-col gap-4"
      >
        <Input
          id="firstName"
          label="First Name"
          required
          register={register}
          errors={errors}
        />
        <Input
          id="lastName"
          label="Last Name"
          required
          register={register}
          errors={errors}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          required
          register={register}
          errors={errors}
        />
        <Input
          id="phone"
          label="Phone Number"
          type="tel"
          required
          register={register}
          errors={errors}
        />
      </form>
    </div>
  );
};

export default PersonalDetailsForm;
