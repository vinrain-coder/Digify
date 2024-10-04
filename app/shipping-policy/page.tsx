
import Container from "../components/Container";
import ShippingPolicy from "./ShippingPolicy";

const Shipping: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 pt-8">
      <Container>
        <ShippingPolicy/>
      </Container>
    </div>
  );
};

export default Shipping;