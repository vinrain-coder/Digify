import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import { products } from "@/utils/products";

interface IParams {
  productId?: string;
}

const Product = ({ params }: { params: IParams }) => {
  const product = products.find((item) => item.id === params.productId);

  return (
    <div className="p-2 mt-8">
      <Container>
        {product ? (
          <>
            <ProductDetails product={product} />
            <div className="flex flex-col mt-20 gap-4">
              <div>Add Rating</div>
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
<<<<<<< HEAD
=======

>>>>>>> 9227df1 (completed cart functionality)
