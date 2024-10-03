import React from "react";
import { MdDone } from "react-icons/md";

const PaymentOptions = () => {
  return (
    <div className="w-full p-4 border border-gray-200 rounded-lg bg-white shadow-md min-w-[350px] md:min-w-[590px]">
      <h4 className="text-md font-semibold mb-4">Payment Options</h4>
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 border border-gray-200 rounded-lg bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="mpesa"
            name="payment"
            className="cursor-pointer h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="mpesa" className="cursor-pointer text-sm font-medium">
            M-Pesa
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="card"
            name="payment"
            className="cursor-pointer h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="card" className="cursor-pointer text-sm font-medium">
            Credit/Debit Card
          </label>
        </div>
      </div>
      <p className="mt-2 flex text-sm font-md gap-1 items-center">
        <MdDone className="text-green-500 border border-teal-100 bg-teal-100 rounded-full" />{" "}
        Secure Payments
      </p>
    </div>
  );
};

export default PaymentOptions;
