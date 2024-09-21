import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";

import ListRating from "./ListRating";
import { product } from "@/utils/product";

interface IParams {
  productid?: string;
}

const Product = ({ params }: { params: IParams }) => {
  console.log("params", params);

  return (
    <div className="p-4">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <div>Addd Rating</div>
          <ListRating product={product}/>
        </div>
      </Container>
    </div>
  );
};

export default Product;
