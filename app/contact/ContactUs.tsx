// pages/contact.tsx
import Link from "next/link";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Contact Us</h1>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        <p className="text-lg mb-6 text-gray-600">
          We are here to help! Reach out to us through any of the following
          methods:
        </p>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Email</h2>
          <p className="text-blue-600 text-lg">support@yourshop.com</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Phone</h2>
          <p className="text-blue-600 text-lg">+254 712 345 678</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Address</h2>
          <p className="text-blue-600 text-lg">
            123 YourShop Lane, Nairobi, Kenya
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Follow Us
          </h2>
          <div className="flex justify-center space-x-6">
            <Link
              href="#"
              className="text-blue-600 hover:text-blue-800 transition duration-300"
            >
              <FaTwitter size={28} />
            </Link>
            <Link
              href="#"
              className="text-blue-600 hover:text-blue-800 transition duration-300"
            >
              <FaFacebook size={28} />
            </Link>
            <Link
              href="#"
              className="text-blue-600 hover:text-blue-800 transition duration-300"
            >
              <FaInstagram size={28} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
