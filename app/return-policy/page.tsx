import Container from "../components/Container";
import ReturnPolicy from "./ReturnPolicy";

const ContactUsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 pt-8">
      <Container>
        <ReturnPolicy />
      </Container>
    </div>
  );
};

export default ContactUsPage;
