interface GrandTotalProps {
    cartTotalAmount: number;
    deliveryCharge: number | null;
  }
  
  const GrandTotal: React.FC<GrandTotalProps> = ({ cartTotalAmount, deliveryCharge }) => {
    const grandTotal = cartTotalAmount + (deliveryCharge || 0);
  
    return (
      <div className="w-full p-4 border border-gray-200 rounded-lg bg-slate-50 shadow-md min-w-[350px] md:min-w-[590px]">
        <h4 className="text-md font-semibold mb-4">Total Amount</h4>
        <div className="flex justify-between">
          <span>Cart Total:</span>
          <span>KSh: {cartTotalAmount}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Charge:</span>
          <span>KSh: {deliveryCharge ? deliveryCharge : "0"}</span>
        </div>
        <div className="flex justify-between font-bold mt-4">
          <span>Grand Total:</span>
          <span>KSh: {grandTotal}</span>
        </div>
      </div>
    );
  };
  
  export default GrandTotal;
  