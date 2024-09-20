// src/app/components/products/SetSize.tsx

"use client";

import React from "react";

interface SetSizeProps {
  sizes: string[];
  selectedSize: string;
  handleSizeSelect: (size: string) => void;
}

const SetSize: React.FC<SetSizeProps> = ({
  sizes,
  selectedSize,
  handleSizeSelect,
}) => {
  return (
    <div className="mt-4">
      <span className="font-semibold">SIZE:</span>
      <div className="flex gap-2 mt-2">
        {sizes.map((size) => (
          <div
            key={size}
            onClick={() => handleSizeSelect(size)}
            className={`h-8 w-16 rounded-lg flex items-center justify-center cursor-pointer border ${
              selectedSize === size
                ? "border-blue-500 bg-blue-100"
                : "border-gray-300"
            }`}
          >
            <span className="text-sm font-medium">{size}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetSize;