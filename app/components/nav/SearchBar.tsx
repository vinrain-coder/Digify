"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { MdSearch } from "react-icons/md";

const SearchBar = () => {
  const router = useRouter();
  const [searchError, setSearchError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });

  // Handler for form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const searchTerm = data.searchTerm.trim();

    // Check if the searchTerm is at least 3 characters long
    if (searchTerm.length < 3) {
      setSearchError("Search term must be at least 3 characters.");
      return;
    }

    setSearchError(null); // Clear error if validation passes

    // Build the query string
    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: {
          searchTerm,
        },
      },
      { skipNull: true }
    );

    // Redirect to search results
    router.push(url);
    reset(); // Reset the input field after search
  };

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center">
        <input
          {...register("searchTerm")}
          autoComplete="off"
          type="text"
          placeholder="Explore Digify"
          className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-[0.5px] focus:border-slate-500 w-28 sm:w-56 md:w-80 lg:w-96"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit(onSubmit)(); // Handle Enter key submission
          }}
        />
        <button
          onClick={handleSubmit(onSubmit)}
          className="bg-slate-700 hover:opacity-80 text-white p-3 rounded-r-md"
        >
          <MdSearch />
        </button>
      </div>
      {searchError && (
        <span className="text-red-500 text-sm">{searchError}</span>
      )}{" "}
      {/* Error message */}
      {errors.searchTerm && (
        <span className="text-red-500 text-sm">This field is required</span>
      )}
    </div>
  );
};

export default SearchBar;
