import React from 'react';

const PaymentOptions = () => {
  return (
    <div className="w-full p-4 border border-gray-200 rounded-lg bg-white shadow-md">
      <h4 className="text-md font-semibold mb-4">Payment Options</h4>
      <div className="w-full flex flex-col md:flex-row md:min-w-[500px] justify-between items-center gap-4 p-4 border border-gray-200 rounded-lg bg-white shadow-md">
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
    </div>
  );
};

export default PaymentOptions;
