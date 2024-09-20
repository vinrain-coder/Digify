import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import toast, { Toast } from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
};

export const CartContext = createContext<CartContextType | null>(null);
interface Props {
  [propName: string]: any;
}
export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);

  const [cartProducts, setCartProduct] = useState<CartProductType[] | null>(
    null
  );

  useEffect(() => {
    const cartItems: any = localStorage.getItem("ShoepediCartItems");
    const cartProducts: CartProductType[] | null = JSON.parse(cartItems);

    setCartProduct(cartProducts);
  }, []);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProduct((prev) => {
      let updatedCart;

      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }

      toast.success("Product added to cart");

      localStorage.setItem("ShoepediCartItems", JSON.stringify(updatedCart));

      return updatedCart;
    });
  }, []);

  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
  };
  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
