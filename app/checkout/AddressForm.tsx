import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Input from "../components/inputs/Input";

interface AddressFormProps {
  onSubmit: SubmitHandler<FieldValues>;
}

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      county: "",
      estate: "",
      street: "",
    },
  });

  return (
    <div className="w-full p-4 border border-gray-200 rounded-lg bg-white shadow-md">
      <h4 className="text-md font-semibold mb-4">Delivery Addess</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:min-w-[500px] flex flex-col gap-4"
      >
        <Input
          id="county"
          label="County"
          required
          register={register}
          errors={errors}
        />
        <Input
          id="estate"
          label="Estate/Town"
          required
          register={register}
          errors={errors}
        />
        <Input
          id="street"
          label="Street Name (Optional)"
          register={register}
          errors={errors}
        />
      </form>
    </div>
  );
};

export default AddressForm;
