// pages/return-policy.tsx
import React from 'react';

const ReturnPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">Return Policy</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">1. Overview</h2>
          <p className="text-gray-600 text-lg">
            At YourShop, we strive to ensure that you're happy with your purchase. If for any reason you're not satisfied with your order, you may be eligible for a return, refund, or exchange. Please review the following details carefully.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">2. Eligibility for Returns</h2>
          <p className="text-gray-600 text-lg">
            To be eligible for a return, your item must meet the following conditions:
          </p>
          <ul className="list-disc list-inside text-gray-600 text-lg">
            <li>Item must be unused, in the same condition that you received it, and in its original packaging.</li>
            <li>Return must be initiated within 30 days of receiving the item.</li>
            <li>Items such as undergarments, gift cards, and sale items are non-returnable.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">3. How to Initiate a Return</h2>
          <p className="text-gray-600 text-lg">
            To initiate a return, please follow these steps:
          </p>
          <ul className="list-decimal list-inside text-gray-600 text-lg">
            <li>Contact our customer support team at <span className="text-blue-600">support@yourshop.com</span> or call <span className="text-blue-600">+254 712 345 678</span> to request a return authorization.</li>
            <li>Provide your order number and reason for the return.</li>
            <li>Once your return is approved, you will receive instructions on how to ship the item back to us.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">4. Shipping Your Return</h2>
          <p className="text-gray-600 text-lg">
            You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">5. Refunds</h2>
          <p className="text-gray-600 text-lg">
            Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within a certain amount of days.
          </p>
          <p className="text-gray-600 text-lg mt-4">
            Please note:
          </p>
          <ul className="list-disc list-inside text-gray-600 text-lg">
            <li>Original shipping fees are non-refundable.</li>
            <li>If more than 14 days have passed since your return was approved, please contact us at <span className="text-blue-600">support@yourshop.com</span>.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">6. Exchanges</h2>
          <p className="text-gray-600 text-lg">
            We only replace items if they are defective or damaged. If you need to exchange an item for the same product, please contact us at <span className="text-blue-600">support@yourshop.com</span>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">7. Non-Returnable Items</h2>
          <p className="text-gray-600 text-lg">
            Some items are exempt from being returned, including:
          </p>
          <ul className="list-disc list-inside text-gray-600 text-lg">
            <li>Gift cards</li>
            <li>Sale items</li>
            <li>Undergarments</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">8. Contact Information</h2>
          <p className="text-gray-600 text-lg">
            If you have any questions about our return policy, please contact our customer support team at <span className="text-blue-600">support@yourshop.com</span> or call us at <span className="text-blue-600">+254 712 345 678</span>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ReturnPolicy;
