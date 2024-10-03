import { CartProductType } from "@/app/product/[productId]/ProductDetails"; // Ensure the path is correct
import ItemContent from "../cart/ItemContent";

interface OrderSummaryProps {
  cartProducts: CartProductType[] | null;
  totalAmount: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartProducts,
  totalAmount,
}) => {
  return (
    <div className="w-full p-4 border border-gray-200 rounded-lg bg-white shadow-md">
      <h4 className="text-md font-semibold mb-4">Order Summary</h4>
      <div className="w-full space-y-4">
        <div className="flex flex-col space-y-4">
          {cartProducts?.map((product) => (
            <ItemContent key={product.id} item={product} />
          ))}
        </div>

        {/* Total Amount */}
        <div className="flex justify-between font-bold mt-4">
          <span>Total:</span>
          <span>KSh: {totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
