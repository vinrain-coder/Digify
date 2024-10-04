// pages/privacy-policy.tsx
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">Privacy Policy</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">1. Introduction</h2>
          <p className="text-gray-600 text-lg">
            At YourShop, we value your privacy and are committed to protecting your personal data. This privacy policy outlines how we collect, use, and protect your personal information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">2. Data We Collect</h2>
          <p className="text-gray-600 text-lg">
            We may collect the following types of personal information when you use our website:
          </p>
          <ul className="list-disc list-inside text-gray-600 text-lg">
            <li>Personal identification information (name, email address, phone number, etc.)</li>
            <li>Payment details (credit card information, billing address)</li>
            <li>Shipping details (delivery address, phone number)</li>
            <li>Browser data and device information</li>
            <li>Purchase history and product preferences</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">3. How We Use Your Data</h2>
          <p className="text-gray-600 text-lg">
            We use the data we collect for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-600 text-lg">
            <li>To process your orders and deliver products</li>
            <li>To communicate with you about your order or account</li>
            <li>To send promotional emails and marketing materials (you may opt-out at any time)</li>
            <li>To improve our website and services</li>
            <li>To prevent fraud and secure your transactions</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">4. Data Sharing and Disclosure</h2>
          <p className="text-gray-600 text-lg">
            We do not share your personal information with third parties except under the following circumstances:
          </p>
          <ul className="list-disc list-inside text-gray-600 text-lg">
            <li>When required by law or legal processes</li>
            <li>To trusted service providers who assist us in running our website and fulfilling your orders (e.g., payment processors, delivery services)</li>
            <li>In the event of a business transaction such as a merger or sale</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">5. Data Security</h2>
          <p className="text-gray-600 text-lg">
            We implement industry-standard security measures to protect your personal data. This includes encryption of sensitive information, regular security audits, and restricted access to personal data. However, no system is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">6. Cookies and Tracking Technologies</h2>
          <p className="text-gray-600 text-lg">
            We use cookies and similar tracking technologies to enhance your browsing experience and collect information about how you use our website. You can disable cookies in your browser settings, but this may affect some functionalities of the website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">7. Your Rights</h2>
          <p className="text-gray-600 text-lg">
            You have the following rights regarding your personal data:
          </p>
          <ul className="list-disc list-inside text-gray-600 text-lg">
            <li>Access: You can request a copy of the personal data we hold about you.</li>
            <li>Correction: You can request corrections to your personal data if it is inaccurate.</li>
            <li>Deletion: You can request the deletion of your personal data in certain circumstances.</li>
            <li>Objection: You can object to the processing of your personal data for marketing purposes.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">8. Changes to This Privacy Policy</h2>
          <p className="text-gray-600 text-lg">
            We may update this privacy policy from time to time to reflect changes in our practices or legal obligations. Any updates will be posted on this page, and the date of the latest revision will be indicated at the top of the policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">9. Contact Us</h2>
          <p className="text-gray-600 text-lg">
            If you have any questions about this privacy policy or how we handle your personal data, please contact us at <span className="text-blue-600">support@yourshop.com</span> or call us at <span className="text-blue-600">+254 712 345 678</span>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
