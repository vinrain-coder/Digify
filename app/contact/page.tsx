// pages/contact.tsx
import React from "react";
import ContactUs from "./ContactUs";
import Container from "../components/Container";

const ContactUsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 pt-8">
      <Container>
        <ContactUs />
      </Container>
    </div>
  );
};

export default ContactUsPage;
