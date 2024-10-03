import React from "react";

interface SelectedLocationProps {
  county: string;
  city: string;
  deliveryCharge: number | null;
}

const SelectedLocation: React.FC<SelectedLocationProps> = ({ county, city, deliveryCharge }) => {
  return (
    <div className="w-full p-4 border border-gray-300 rounded-md bg-gray-50 mt-4">
      <h4 className="text-md font-semibold mb-2">Selected Address</h4>
      <p>
        <strong>County:</strong> {county || "Not selected"}
      </p>
      <p>
        <strong>City:</strong> {city || "Not selected"}
      </p>
      {deliveryCharge !== null && (
        <p>
          <strong>Delivery Charge:</strong> Ksh {deliveryCharge}
        </p>
      )}
    </div>
  );
};

export default SelectedLocation;
