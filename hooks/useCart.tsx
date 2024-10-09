import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[];
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQuantityIncrease: (product: CartProductType) => void;
  handleCartQuantityDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (value: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const CartContextProvider: React.FC<Props> = ({ children }) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]); // Initialize as an empty array

  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  // Load cart items from local storage
  useEffect(() => {
    const cartItems = localStorage.getItem("ShoepediCartItems");
    if (cartItems) {
      try {
        const parsedCartItems: CartProductType[] = JSON.parse(cartItems);
        setCartProducts(parsedCartItems);
      } catch (error) {
        console.error("Failed to parse cart items:", error);
      }
    }

    const paymentIntent = localStorage.getItem("ShoepediPaymentIntent");

    setCartProducts(cartProducts);
    setPaymentIntent(paymentIntent);
  }, []);

  // Calculate total quantity and amount whenever cartProducts change
  useEffect(() => {
    const { total, qty } = cartProducts.reduce(
      (acc, item) => {
        acc.total += item.price * item.quantity;
        acc.qty += item.quantity;
        return acc;
      },
      { total: 0, qty: 0 }
    );

    setCartTotalQty(qty);
    setCartTotalAmount(total);
  }, [cartProducts]);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);
      const updatedCart = existingProduct
        ? prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1 }];

      localStorage.setItem("ShoepediCartItems", JSON.stringify(updatedCart));
      toast.success("Product added to cart"); // Set toast message
      return updatedCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      setCartProducts((prev) => {
        const filteredProducts = prev.filter((item) => item.id !== product.id);
        localStorage.setItem(
          "ShoepediCartItems",
          JSON.stringify(filteredProducts)
        );
        toast.success("Product removed"); // Set toast message
        return filteredProducts;
      });
    },
    []
  );

  const handleCartQuantityIncrease = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      const updatedCart = prev.map((item) => {
        if (item.id === product.id) {
          if (item.quantity < 20) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            toast.error("Oops! Maximum reached"); // Set toast message
          }
        }
        return item;
      });
      localStorage.setItem("ShoepediCartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const handleCartQuantityDecrease = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      const updatedCart = prev.map((item) => {
        if (item.id === product.id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            toast.error("Oops! Minimum reached"); // Set toast message
          }
        }
        return item;
      });
      localStorage.setItem("ShoepediCartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const handleClearCart = useCallback(() => {
    setCartProducts([]);
    setCartTotalQty(0);
    setCartTotalAmount(0);
    localStorage.setItem("ShoepediCartItems", JSON.stringify([]));
    toast.success("Cart cleared"); // Set toast message
  }, []);

  const handleSetPaymentIntent = useCallback(
    (value: string | null) => {
      setPaymentIntent(value);
      localStorage.setItem("ShoepediPaymentIntent", JSON.stringify(value));
    },
    [paymentIntent]
  );

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQuantityIncrease,
    handleCartQuantityDecrease,
    handleClearCart,
    paymentIntent,
    handleSetPaymentIntent,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
