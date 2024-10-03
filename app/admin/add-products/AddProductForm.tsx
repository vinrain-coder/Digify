"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckbox from "@/app/components/inputs/CustomCheckbox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import firebaseApp from "@/libs/firebase";
import { categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import { Sizes } from "@/utils/Sizes";
import SelectSize from "@/app/components/inputs/SelectSize";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";
import { useRouter } from "next/navigation";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  imageUrl: string;
};

const AddProductForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); 
  const [images, setImages] = useState<ImageType[]>([]); // Initialize as an empty array
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]); // Manage selected sizes
  const [isProductCreated, setIsProductCreated] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
      price: "",
    },
  });

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages([]);
      setSelectedSizes([]);
      setIsProductCreated(false);
    }
  }, [isProductCreated, reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error("Category is not selected");
    }

    if (images.length === 0) {
      setIsLoading(false);
      return toast.error("No selected image");
    }

    // Upload images
    const handleImageUploads = async () => {
      toast("Creating product, please wait...");
      try {
        for (const item of images) {
          if (item.image) {
            const fileName = new Date().getTime() + "-" + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                },
                (error) => {
                  console.error("Error uploading image", error);
                  reject(error);
                },
                async () => {
                  try {
                    const downloadURL = await getDownloadURL(
                      uploadTask.snapshot.ref
                    );
                    uploadedImages.push({
                      color: item.color,
                      colorCode: item.colorCode,
                      imageUrl: downloadURL,
                    });
                    resolve();
                  } catch (error) {
                    console.error("Error getting the download URL", error);
                    reject(error);
                  }
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error handling image uploads", error);
        toast.error("Error handling image uploads");
      }
    };

    await handleImageUploads();

    // Prepare the product data with uploaded images and selected sizes
    const productData = {
      ...data,
      images: uploadedImages,
      sizes: selectedSizes.map((size) => ({ size })), // Map sizes to the correct format
    };

    // Send the product data to the API
    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Product created successfully");
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((error) => {
        console.error("API Error:", error);
        toast.error("Something went wrong when saving product to db");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => [...prev, value]);
  }, []);

  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => prev.filter((item) => item.color !== value.color));
  }, []);

  const handleSizeSelection = (size: string) => {
    setSelectedSizes((prev) => {
      const isSelected = prev.includes(size);
      if (isSelected) {
        return prev.filter((item) => item !== size); // Remove if already selected
      }
      return [...prev, size]; // Add size if not selected
    });
  };

  return (
    <>
      <Heading title="Add a product" center />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="number"
        required
      />
      <Input
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckbox
        id="inStock"
        register={register}
        label="This product is in stock"
      />
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a Category</div>
        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto">
          {categories.map((item) => {
            if (item.label === "All") return null;
            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={watch("category") === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
          <div className="font-bold">
            Select the available sizes, colors, and upload their images
          </div>
          <div className="text-sm">You must upload an image for each color</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {colors.map((item, index) => (
            <SelectColor
              key={index}
              item={item}
              addImageToState={addImageToState}
              removeImageFromState={removeImageFromState}
              isProductCreated={isProductCreated}
            />
          ))}
        </div>
        <div className="mb-2 font-semibold">Select Sizes</div>
        <div className="grid gap-3 grid-cols-4 md:grid-cols-6 max-h-[50vh] overflow-y-auto">
          {Sizes.map((item) => (
            <div key={item.label} className="col-span">
              <SelectSize
                onClick={() => handleSizeSelection(item.label)}
                selected={selectedSizes.includes(item.label)}
                label={item.label}
              />
            </div>
          ))}
        </div>
      </div>
      <Button
        label={isLoading ? "Loading..." : "Add Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProductForm;
