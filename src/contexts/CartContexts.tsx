// src/contexts/CartProvider.tsx
import { useState, useEffect, useCallback, useMemo, type ReactNode } from "react";
import type { ClothingProductData } from "../types/product";
import type { CartItem } from "../types/cart";
import { CartContext } from "./CartContextUtils";

// Función para obtener el carrito inicial
const getInitialCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to parse cart from localStorage", e);
    return [];
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(getInitialCart);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);

  // Persistir en localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  }, [cartItems]);

  // Agregar al carrito con verificación de stock
  const addToCart = useCallback((product: ClothingProductData, quantity: number, color: string, size: string) => {
    const cartItemId = `${product.id}-${color}-${size}`;

    // Buscar variante para verificar stock
    const variant = product.variants.find((v) => v.color === color && v.size === size);

    if (!variant || variant.stock <= 0) {
      console.error("Product variant not available");
      return;
    }

    // Calcular cantidad máxima permitida
    const maxQuantity = Math.min(variant.stock, 10);
    const finalQuantity = Math.min(quantity, maxQuantity);

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);

      if (existingIndex !== -1) {
        const newItems = [...prev];
        const existingItem = newItems[existingIndex];
        const newQuantity = Math.min(existingItem.quantity + finalQuantity, maxQuantity);

        newItems[existingIndex] = {
          ...existingItem,
          quantity: newQuantity,
        };

        return newItems;
      }

      const newItem: CartItem = {
        ...product,
        quantity: finalQuantity,
        color,
        size,
        cartItemId,
        variantStock: variant.stock,
      };

      setLastAddedItem(newItem);
      return [...prev, newItem];
    });
  }, []);

  // Eliminar item del carrito
  const removeFromCart = useCallback((cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  }, []);

  // Actualizar cantidad con verificación de stock
  const updateQuantity = useCallback(
    (cartItemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(cartItemId);
        return;
      }

      setCartItems((prev) =>
        prev.map((item) => {
          if (item.cartItemId === cartItemId) {
            const maxQuantity = item.variantStock;
            return {
              ...item,
              quantity: Math.min(quantity, maxQuantity),
            };
          }
          return item;
        })
      );
    },
    [removeFromCart]
  );

  // Vaciar carrito
  const clearCart = useCallback(() => {
    setCartItems([]);
    setLastAddedItem(null);
  }, []);

  // Cálculo del total del carrito
  const cartTotal = useMemo(() => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0), [cartItems]);

  // Contador de items en el carrito
  const cartItemCount = useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);

  // Aplicar cupón (para implementación futura)
  const applyCoupon = useCallback((code: string) => {
    console.log("Applying coupon:", code);
    // Lógica futura para aplicar cupones
  }, []);

  // Valor del contexto
  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartItemCount,
      applyCoupon,
      shippingCost: 0,
      discount: 0,
      lastAddedItem,
    }),
    [
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartItemCount,
      applyCoupon,
      lastAddedItem,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
