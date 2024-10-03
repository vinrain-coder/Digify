// src/hooks/useLocation.ts
import { counties, getCitiesByCounty, getDeliveryCharges } from "@/utils/locations";
import { useState } from "react";

export const useAddressForm = () => {
  const [selectedCounty, setSelectedCounty] = useState<string>("");
  const [countySuggestions, setCountySuggestions] = useState<string[]>([]);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [deliveryCharge, setDeliveryCharge] = useState<number | null>(null);

  // Handle county change and update suggestions
  const handleCountyChange = (value: string) => {
    setSelectedCounty(value);

    // Filter county suggestions
    const filteredSuggestions = counties
      .map((county) => county.name)
      .filter((county) => county.toLowerCase().includes(value.toLowerCase()));
    setCountySuggestions(filteredSuggestions);

    // Reset city suggestions when county changes
    setCitySuggestions([]);
    setSelectedCity("");
    setDeliveryCharge(null); // Reset delivery charge
  };

  // Handle city change and update city suggestions
  const handleCityChange = (value: string) => {
    setSelectedCity(value);

    // Filter city suggestions based on selected county
    if (selectedCounty) {
      const filteredCities = getCitiesByCounty(selectedCounty).filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setCitySuggestions(filteredCities);
    }
  };

  // Handle county selection from suggestions
  const handleCountySelect = (county: string) => {
    setSelectedCounty(county);
    setCountySuggestions([]); // Clear suggestions after selection
    setCitySuggestions(getCitiesByCounty(county)); // Set available cities based on selected county
  };

  // Handle city selection from suggestions
  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setCitySuggestions([]); // Clear suggestions after selection
    setDeliveryCharge(getDeliveryCharges(selectedCounty, city)); // Set delivery charge
  };

  return {
    selectedCounty,
    selectedCity,
    countySuggestions,
    citySuggestions,
    deliveryCharge,
    handleCountyChange,
    handleCityChange,
    handleCountySelect,
    handleCitySelect,
  };
};
