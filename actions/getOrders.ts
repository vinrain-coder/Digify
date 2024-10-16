import prisma from "@/libs/prismadb";
import { Order, User } from "@prisma/client";

type ExtendedOrder = Order & {
  user: User;
};

export default async function getOrders(): Promise<ExtendedOrder[]> {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdDate: "desc",
      },
    });
    return orders as ExtendedOrder[]; // Ensure the return type matches ExtendedOrder[]
  } catch (error: any) {
    console.error("Error fetching orders:", error); // Log the error for debugging
    return []; // Return an empty array in case of error
  }
}
