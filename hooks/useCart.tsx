import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQuantityIncrease: (product: CartProductType) => void;
  handleCartQuantityDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProduct] = useState<CartProductType[] | null>(null);

  useEffect(() => {
    const cartItems = localStorage.getItem("ShoepediCartItems");
    const cartProducts: CartProductType[] | null = cartItems ? JSON.parse(cartItems) : null;
    setCartProduct(cartProducts);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;
            acc.total += itemTotal;
            acc.qty += item.quantity;
            return acc;
          },
          { total: 0, qty: 0 }
        );
        setCartTotalQty(qty);
        setCartTotalAmount(total);
      }
    };
    getTotals();
  }, [cartProducts]);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProduct((prev) => {
      const updatedCart = prev ? [...prev, product] : [product];
      localStorage.setItem("ShoepediCartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
    toast.success("Product added to cart");
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter((item) => item.id !== product.id);
        setCartProduct(filteredProducts);
        localStorage.setItem("ShoepediCartItems", JSON.stringify(filteredProducts));
        toast.success("Product removed");
      }
    },
    [cartProducts]
  );

  const handleCartQuantityIncrease = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex((item) => item.id === product.id);

        if (existingIndex > -1) {
          if (updatedCart[existingIndex].quantity === 20) {
            return toast.error("Oops! Maximum reached");
          }

          updatedCart[existingIndex].quantity += 1;
          setCartProduct(updatedCart);
          localStorage.setItem("ShoepediCartItems", JSON.stringify(updatedCart));
          toast.success("Product quantity increased");
        }
      }
    },
    [cartProducts]
  );

  const handleCartQuantityDecrease = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex((item) => item.id === product.id);

        if (existingIndex > -1) {
          if (updatedCart[existingIndex].quantity === 1) {
            return toast.error("Oops! Minimum reached");
          }

          updatedCart[existingIndex].quantity -= 1;
          setCartProduct(updatedCart);
          localStorage.setItem("ShoepediCartItems", JSON.stringify(updatedCart));
          toast.success("Product quantity decreased");
        }
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProduct(null);
    setCartTotalQty(0);
    setCartTotalAmount(0);
    localStorage.setItem("ShoepediCartItems", JSON.stringify([]));
  }, []);

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQuantityIncrease,
    handleCartQuantityDecrease,
    handleClearCart,
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

