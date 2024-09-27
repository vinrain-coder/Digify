import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    name,
    description,
    price,
    brand,
    category,
    inStock,
    images, // Ensure images is properly structured in the request
    variants,
  } = body;

  // Create the product along with its variants and images
  const product = await prisma.product.create({
    data: {
      name,
      description,
      brand,
      category,
      inStock,
      price: parseFloat(price),
      image: images.map(
        (image: { color: string; colorCode: string; imageUrl: string }) => ({
          color: image.color,
          colorCode: image.colorCode,
          imageUrl: image.imageUrl, // Ensure this matches the schema
        })
      ),
      productVariants: {
        create: variants.map(
          (variant: {
            size: string;
            color: string;
            colorCode: string;
            quantity: number;
          }) => ({
            size: {
              connectOrCreate: {
                where: { value: variant.size }, // Ensure size exists or create it
                create: { value: variant.size },
              },
            },
            color: {
              connectOrCreate: {
                where: { name: variant.color }, // Ensure color exists or create it
                create: { name: variant.color, colorCode: variant.colorCode },
              },
            },
            quantity: variant.quantity, // Set quantity for this size-color combination
          })
        ),
      },
    },
  });

  return NextResponse.json(product);
}
