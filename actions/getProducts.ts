import prisma from "@/libs/prismadb";

export interface IProductParams {
  category?: string | null;
  searchTerm?: string | null;
}

export default async function getProducts(params: IProductParams) {
  try {
    const { category, searchTerm } = params;

    // Ensure searchTerm is at least 3 characters long
    let searchString = searchTerm && searchTerm.trim().length >= 3 ? searchTerm.trim() : "";

    let query: any = {};

    // If category is provided, include it in the query
    if (category) {
      query.category = category;
    }

    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: searchString
          ? [
              {
                name: {
                  contains: searchString, // Search by name
                  mode: "insensitive", // Case-insensitive search
                },
              },
              {
                description: {
                  contains: searchString, // Search by description
                  mode: "insensitive", // Case-insensitive search
                },
              },
            ]
          : undefined,
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: "desc",
          },
        },
      },
    });

    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}
