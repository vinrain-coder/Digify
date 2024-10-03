import React, { useState, useEffect, useRef } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Input from "../components/inputs/Input";
import { useAddressForm } from "@/hooks/useLocation";

interface AddressFormProps {
  onSubmit: SubmitHandler<FieldValues>;
  updateSelectedLocation: (county: string, city: string, deliveryCharge: number | null) => void; // New prop
}

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit, updateSelectedLocation }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      county: "",
      city: "",
      street: "",
      address: "",
      additionalInfo: "", // Adding default value for the new text area field
    },
  });

  const [countyInput, setCountyInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [showCountySuggestions, setShowCountySuggestions] = useState(false);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);

  const {
    selectedCounty,
    selectedCity,
    countySuggestions,
    citySuggestions,
    deliveryCharge,
    handleCountyChange,
    handleCityChange,
    handleCountySelect,
    handleCitySelect,
  } = useAddressForm();

  const countyRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);

  const sortedCountySuggestions = countySuggestions.sort();
  const sortedCitySuggestions = citySuggestions.sort();

  const onCountySelect = (county: string) => {
    handleCountySelect(county);
    setCountyInput(county);
    setValue("county", county);
    updateSelectedLocation(county, selectedCity, deliveryCharge);
    setShowCountySuggestions(false);
    setCityInput("");
    setShowCitySuggestions(true);
  };

  const onCitySelect = (city: string) => {
    handleCitySelect(city);
    setCityInput(city);
    setValue("city", city);
    updateSelectedLocation(selectedCounty, city, deliveryCharge);
    setShowCitySuggestions(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (countyRef.current && !countyRef.current.contains(event.target as Node)) {
      setShowCountySuggestions(false);
    }
    if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
      setShowCitySuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full p-4 border border-gray-200 rounded-lg bg-slate-50 shadow-md min-w-[350px] md:min-w-[590px]">
      <h4 className="text-md font-semibold mb-4">Delivery Address</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:min-w-[500px] flex flex-col gap-4"
      >
        {/* County Input */}
        <div className="relative w-full" ref={countyRef}>
          <input
            type="text"
            value={countyInput}
            onClick={() => setShowCountySuggestions(true)}
            onChange={(e) => {
              setCountyInput(e.target.value);
              handleCountyChange(e.target.value);
              if (e.target.value) setShowCountySuggestions(true);
            }}
            className={`w-full p-4 border-2 rounded-md ${
              errors.county ? "border-rose-400" : "border-slate-300"
            }`}
            placeholder="Select County"
          />
          {showCountySuggestions && sortedCountySuggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-full max-h-60 overflow-auto">
              {sortedCountySuggestions.map((county) => (
                <li
                  key={county}
                  onClick={() => onCountySelect(county)}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                >
                  {county}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* City Input */}
        <div className="relative w-full" ref={cityRef}>
          <input
            type="text"
            value={cityInput}
            onClick={() => {
              if (selectedCounty) {
                setShowCitySuggestions(true);
              }
            }}
            onChange={(e) => {
              setCityInput(e.target.value);
              handleCityChange(e.target.value);
              if (e.target.value) setShowCitySuggestions(true);
            }}
            className={`w-full p-4 border-2 rounded-md ${
              errors.city ? "border-rose-400" : "border-slate-300"
            }`}
            placeholder="Select City/Town"
            disabled={!selectedCounty}
          />
          {showCitySuggestions && sortedCitySuggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-full max-h-60 overflow-auto">
              {sortedCitySuggestions.map((city) => (
                <li
                  key={city}
                  onClick={() => onCitySelect(city)}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Other Inputs */}
        <Input
          id="street"
          label="Street Name (Optional)"
          register={register}
          errors={errors}
        />
        <Input
          id="address"
          label="Postal Address (Optional)"
          register={register}
          errors={errors}
        />

        {/* New Text Area Input for Additional Information */}
        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
            Additional Information (Optional)
          </label>
          <textarea
            id="additionalInfo"
            {...register("additionalInfo")}
            rows={4}
            className={`mt-1 block w-full p-4 border-2 rounded-md ${
              errors.additionalInfo ? "border-rose-400" : "border-slate-300"
            }`}
            placeholder="Any additional delivery instructions or information"
          />
        </div>

        {/* Display delivery charge dynamically */}
        {deliveryCharge !== null && (
          <div className="mt-4">
            <p className="text-green-600 font-semibold">
              Delivery to {selectedCity}, {selectedCounty} will cost Ksh {deliveryCharge}.
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddressForm;

