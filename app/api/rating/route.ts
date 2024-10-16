import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb"; // Make sure prisma is imported
import { NextResponse } from "next/server";
import { Review, Product, Order } from "@prisma/client"; // Import necessary Prisma types

// Define types for the current user and their orders
interface CurrentUser {
  id: string;
  orders: (Order & { products: Product[] })[]; // Order with associated products
}

export async function POST(request: Request) {
  const currentUser = (await getCurrentUser()) as CurrentUser | null;

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { comment, rating, product, userId } = body;

  // Ensure product has type Product
  const deliveredOrder = currentUser.orders.some(
    (order) =>
      order.products.some((item: Product) => item.id === product.id) &&
      order.deliveryStatus === "delivered"
  );

  const userReview = product?.reviews?.find((review: Review) => {
    return review.userId === currentUser.id;
  });

  if (userReview || !deliveredOrder) {
    return NextResponse.error();
  }

  const review = await prisma.review.create({
    data: {
      comment,
      rating,
      productId: product.id,
      userId,
    },
  });

  return NextResponse.json(review);
}
