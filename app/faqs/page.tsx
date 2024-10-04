import Container from "../components/Container";
import FAQs from "./faqs";

const ContactUsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 pt-8">
      <Container>
        <FAQs />
      </Container>
    </div>
  );
};

export default ContactUsPage;
