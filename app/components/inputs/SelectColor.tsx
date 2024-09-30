"use client";

import { ImageType } from "@/app/admin/add-products/AddProductForm";
import { useCallback, useEffect, useState } from "react";
import SelectImage from "./SetectImage";
import Button from "../Button";

interface SelectColorProps {
  item: ImageType;
  addImageToState: (value: ImageType) => void;
  removeImageFromState: (value: ImageType) => void;
  isProductCreated: boolean;
}

const SelectColor: React.FC<SelectColorProps> = ({
  item,
  addImageToState,
  removeImageFromState,
  isProductCreated,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  // Debugging: Log isSelected state to confirm if it toggles correctly
  useEffect(() => {
    console.log("isSelected state:", isSelected);
  }, [isSelected]);

  // Reset when the product is created
  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);

  // Handle file change
  const handleFileChange = useCallback(
    (value: File) => {
      setFile(value);
      addImageToState({ ...item, image: value });
    },
    [addImageToState, item]
  );

  // Handle checkbox check/uncheck
  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      setIsSelected(isChecked); // Update state correctly

      if (!isChecked) {
        setFile(null);
        removeImageFromState(item);
      }
    },
    [removeImageFromState, item]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 overflow-y-auto border-b-[1.2px] border-slate-200 items-center p-2">
      <div className="flex flex-row gap-2 items-center h-[60px]">
        {/* Use native input for checkbox */}
        <input
          id={item.color}
          type="checkbox"
          checked={isSelected} // Ensure this is boolean
          onChange={handleCheck} // Correctly handle the change event
          className="cursor-pointer"
        />
        <label htmlFor={item.color} className="font-medium cursor-pointer">
          {item.color}
        </label>
      </div>
      {isSelected && !file && (
        <div className="col-span-2 text-center">
          <SelectImage item={item} handleFileChange={handleFileChange} />
        </div>
      )}
      {file && (
        <div className="flex flex-row gap-2 text-sm col-span-2 items-center justify-between">
          <p>{file?.name}</p>
          <div className="w-70px">
            <Button
              label="Cancel"
              small
              outline
              onClick={() => {
                setFile(null);
                removeImageFromState(item);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectColor;
