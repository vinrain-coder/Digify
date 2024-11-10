"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const HomeBanner: React.FC = () => {
  return (
    <div className="mb-8 bg-gray-100 py-10">
      <div className="container mx-auto px-4 py-2">
        {/* Responsive layout: carousel on top for small screens, on left for medium and larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Carousel Section */}
          <div className="w-full">
            <style jsx>{`
              .carousel-container {
                position: relative;
                overflow: hidden;
                width: 100%;
                height: 100%;
              }

              .carousel {
              
                display: flex;
                width: 200%; /* Ensure enough width for two slides */
                transform: translateX(0);
                animation: slide 10s infinite;
              }

              .carousel-item {
              
                width: 48%; /* Each item takes half the width to allow two items in the carousel */
                transition: transform 0.5s ease-in-out;
              }

              /* Keyframe animation for sliding carousel */
              @keyframes slide {
                0% {
                  transform: translateX(0);
                }
                50% {
                  transform: translateX(-50%);
                }
                100% {
                  transform: translateX(0);
                }
              }
            `}</style>
            <div className="carousel-container">
              <div className="carousel gap-4">
                <div className="carousel-item">
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link href="/shop">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg flex items-center justify-between h-[200px] md:h-[320px]">
                        <div className="text-left w-[50%]">
                          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                            Welcome to Our Shop
                          </h2>
                          <p className="text-white text-sm md:text-base">
                            Discover the latest trends in footwear.
                          </p>
                        </div>
                        <div className="w-32 h-32 md:w-48 md:h-48 relative">
                          <Image
                            src="/banner-image.png"
                            alt="Banner-1"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </div>

                <div className="carousel-item">
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link href="/new-arrivals">
                      <div className="bg-gradient-to-r from-green-500 to-yellow-600 p-4 rounded-lg flex items-center justify-between h-[200px] md:h-[320px]">
                        <div className="text-left w-[50%]">
                          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                            New Arrivals
                          </h2>
                          <p className="text-white text-sm md:text-base">
                            Check out our latest collection.
                          </p>
                        </div>
                        <div className="w-32 h-32 md:w-48 md:h-48 relative">
                          <Image
                            src="/banner-image.png"
                            alt="Banner-2"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Static Banners Section */}
          <div className="hidden md:grid md:grid-cols-2 gap-4 ">
            {[
              {
                title: "Sale",
                description: "Up to 50% off selected items.",
                bg: "from-pink-500 to-red-500",
                img: "/banner-image.png",
              },
              {
                title: "Limited",
                description: "Exclusive offers just for you.",
                bg: "from-indigo-500 to-blue-500",
                img: "/banner-image.png",
              },
              {
                title: "Trending",
                description: "Stay ahead with our top picks.",
                bg: "from-teal-500 to-green-500",
                img: "/banner-image.png",
              },
              {
                title: "New",
                description: "Check out our newest arrivals.",
                bg: "from-purple-500 to-pink-500",
                img: "/banner-image.png",
              },
            ].map((banner, index) => (
              <Link href={`/${banner.title.toLowerCase().replace(" ", "-")}`} key={index}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`bg-gradient-to-r ${banner.bg} p-4 rounded-lg flex items-center`}
                >
                  <div className="relative h-[117px] flex gap-1">
                  <div className="text-left z-10">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-300">
                      {banner.title}
                    </h3>
                    <p className="text-gray-200 font-semibold text-xs mt-20 line-clamp-1">{banner.description}</p>
                  </div>
                  <div className="absolute w-32 h-32 right-0">
                    <Image
                      src={banner.img}
                      alt={banner.title}
                      fill
                      className="object-contain right-0 ml-2 "
                    />
                  </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;

