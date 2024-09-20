"use client";

import { truncateText } from "@/utils/toggleText";
import React, { useState } from "react";


interface ProductDescriptionProps {
  description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const limit = 150;
  const { truncatedText, isTruncated } = truncateText(description, limit);

  return (
    <div className="text-justify">
      {showMore ? description : truncatedText}
      {isTruncated && (
        <button
          onClick={toggleShowMore}
          className="text-blue-500 ml-2 hover:underline"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default ProductDescription;
