"use client";

import React, { useState } from "react";
import Avatar from "@/app/components/Avatar";
import Heading from "@/app/components/Heading";
import { Rating } from "@mui/material";
import moment from "moment";

interface ListRatingProps {
  product: any;
}

const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  if (product.reviews.length === 0) return null;
  const [visibleReviews, setVisibleReviews] = useState(3);

  const handleLoadMore = () => {
    setVisibleReviews((prev) => prev + 3);
  };

  return (
    <div>
      <Heading title="Product Review" />
      <div className="text-sm mt-2">
        {product.reviews &&
          product.reviews.slice(0, visibleReviews).map((review: any) => {
            return (
              <div key={review.id} className="max-w-[300px]">
                <div className="flex gap-2 items-center">
                  <Avatar src={review.user.image} />
                  <div className="font-semibold">{review?.user.name}</div>
                  <div className="font-light">
                    {moment(review.createdDate).fromNow()}
                  </div>
                </div>
                <div className="mt-2">
                  <Rating value={review.rating} readOnly />
                  <div className="ml-2 ">{review.comment}</div>
                  <hr className="mt-4 mb-4" />
                </div>
              </div>
            );
          })}

        {visibleReviews < product.reviews.length && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 text-teal-500 bg-transparent border border-teal-500 rounded-md hover:bg-teal-500 hover:text-white"
            >
              Load More Reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListRating;
