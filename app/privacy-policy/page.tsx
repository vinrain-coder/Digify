import Container from "../components/Container";
import PrivacyPolicy from "./PrivacyPolicy";

const ContactUsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 pt-8">
      <Container>
        <PrivacyPolicy />
      </Container>
    </div>
  );
};

export default ContactUsPage;
