export const dynamic = 'force-dynamic';

import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import { getCurrentUser } from "@/actions/getCurrentUser";
// import AddRating from "./AddRating";

interface IParams {
  productId?: string;
}

const Product = async ({ params }: { params: IParams }) => {
  const product = await getProductById(params);
  const user = await getCurrentUser();

  if (!product)
    return <NullData title="Oops! Product with the given id does not exist" />;

  return (
    <div className="p-2 mt-8">
      <Container>
        {product ? (
          <>
            <ProductDetails product={product} />
            <div className="flex flex-col mt-20 gap-4">
              {/* <AddRating product={product} user={user} /> */}
              <ListRating product={product} />
            </div>
          </>
        ) : (
          <div>Product not found</div>
        )}
      </Container>
    </div>
  );
};

export default Product;
