import type { ClothingProductData } from "./product";

export interface CartItem extends ClothingProductData {
  quantity: number;
  color: string;
  size: string;
  cartItemId: string; // clave única: `${id}-${color}-${size}`
  variantStock: number; // Nuevo campo para almacenar el stock de la variante
}
