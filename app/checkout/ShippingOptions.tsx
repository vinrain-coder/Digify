import React from "react";

const ShippingOptions = () => {
  return (
    <div className="w-full p-4 border border-gray-200 rounded-lg bg-white shadow-md">
      <h4 className="text-md font-semibold mb-4">Shipping Options</h4>
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 p-4 border border-gray-200 rounded-lg bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="standard"
            name="shipping"
            className="cursor-pointer h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <label
            htmlFor="standard"
            className="cursor-pointer text-sm font-medium"
          >
            Standard Shipping (3-5 days)
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="express"
            name="shipping"
            className="cursor-pointer h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <label
            htmlFor="express"
            className="cursor-pointer text-sm font-medium"
          >
            Express Shipping (1-2 days)
          </label>
        </div>
      </div>
    </div>
  );
};

export default ShippingOptions;
