// src/contexts/CartContextUtils.ts
import type { CartItem } from "../types/cart";
import type { ClothingProductData } from "../types/product";
import { createContext, useContext } from "react";

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: ClothingProductData, quantity: number, color: string, size: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  applyCoupon: (code: string) => void;
  shippingCost: number;
  discount: number;
  lastAddedItem: CartItem | null; // Nuevo campo para el último item agregado
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
