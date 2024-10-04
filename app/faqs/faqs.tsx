"use client"

import React, { useState } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

const faqsData = [
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for unworn items in their original packaging. To start a return, please contact our support team."
  },
  {
    question: "How long does shipping take?",
    answer: "Shipping typically takes between 3-7 business days, depending on your location. We offer both standard and express shipping options."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to select countries worldwide. Shipping costs and delivery times will be calculated at checkout."
  },
  {
    question: "How do I track my order?",
    answer: "Once your order is shipped, you will receive a confirmation email with a tracking number. You can use this number to track your order on our website or the shipping provider's website."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and mobile payment options such as M-Pesa for our customers in Kenya."
  },
];

const FAQs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">Frequently Asked Questions (FAQs)</h1>
        <div className="space-y-4">
          {faqsData.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left flex justify-between items-center py-4 focus:outline-none"
              >
                <span className="text-xl font-semibold text-gray-700">{faq.question}</span>
                {openIndex === index ? (
                  <AiOutlineUp className="w-6 h-6 text-gray-700" />
                ) : (
                  <AiOutlineDown className="w-6 h-6 text-gray-700" />
                )}
              </button>
              {openIndex === index && (
                <div className="pb-4 text-gray-600 text-lg">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
