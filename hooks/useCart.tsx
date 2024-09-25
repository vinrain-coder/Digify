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
  children: React.ReactNode;
}

export const CartContextProvider: React.FC<Props> = ({ children }) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]); // Initialize as an empty array

  // Load cart items from local storage
  useEffect(() => {
    const cartItems = localStorage.getItem("ShoepediCartItems");
    if (cartItems) {
      const parsedItems: CartProductType[] = JSON.parse(cartItems);
      setCartProducts(parsedItems);
    }
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
      const existingProduct = prev.find(item => item.id === product.id);
      const updatedCart = existingProduct 
        ? prev.map(item => 
            item.id === product.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          ) 
        : [...prev, { ...product, quantity: 1 }];
      
      localStorage.setItem("ShoepediCartItems", JSON.stringify(updatedCart));
      toast.success("Product added to cart");
      return updatedCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      const filteredProducts = prev.filter((item) => item.id !== product.id);
      localStorage.setItem("ShoepediCartItems", JSON.stringify(filteredProducts));
      toast.success("Product removed");
      return filteredProducts;
    });
  }, []);

  const handleCartQuantityIncrease = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      const updatedCart = prev.map(item => {
        if (item.id === product.id) {
          if (item.quantity < 20) {
            return { ...item, quantity: item.quantity + 1 };
          }
          toast.error("Oops! Maximum reached");
        }
        return item;
      });
      localStorage.setItem("ShoepediCartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const handleCartQuantityDecrease = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      const updatedCart = prev.map(item => {
        if (item.id === product.id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          toast.error("Oops! Minimum reached");
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
    toast.success("Cart cleared");
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


