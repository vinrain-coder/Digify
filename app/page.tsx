import { products } from "@/utils/products";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/products/ProductCard";

export default function Home() {
  return (
    <div className="p-2">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {products.map((product: any) => {
            return <ProductCard key={product.id} data={product} />;
          })}
        </div>
      </Container>
    </div>
  );
}

