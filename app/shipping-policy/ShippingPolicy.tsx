// pages/shipping-policy.tsx
import React from 'react';

const ShippingPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">Shipping Policy</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Domestic Shipping</h2>
          <p className="text-gray-600 text-lg">
            We offer shipping across all counties in Kenya. Orders are processed within 1-2 business days after receiving your order confirmation email.
            You will receive another notification when your order has shipped. 
            Shipping rates are calculated at checkout and are based on your location.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">International Shipping</h2>
          <p className="text-gray-600 text-lg">
            We currently ship to select countries outside of Kenya. International shipping rates vary depending on the destination and are calculated at checkout. 
            Please allow additional time for international orders due to customs processing.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Shipping Rates</h2>
          <p className="text-gray-600 text-lg">
            Shipping rates are calculated based on your location and the weight of the package. 
            You will be provided with shipping options and costs during checkout.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Delivery Times</h2>
          <p className="text-gray-600 text-lg">
            - Local delivery within Nairobi: 1-2 business days.<br />
            - Other counties within Kenya: 2-5 business days.<br />
            - International delivery: 7-14 business days, depending on customs clearance.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Returns</h2>
          <p className="text-gray-600 text-lg">
            We accept returns within 30 days of delivery if the item is unused and in its original condition. The customer is responsible for return shipping costs. 
            For any questions or concerns, please contact our support team at <span className="text-blue-600">support@yourshop.com</span>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Contact Us</h2>
          <p className="text-gray-600 text-lg">
            If you have any questions about our shipping policy, please contact us at <span className="text-blue-600">support@yourshop.com</span> or call us at <span className="text-blue-600">+254 712 345 678</span>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicy;
