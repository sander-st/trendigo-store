import { motion } from "framer-motion";
import type { CartItem } from "../../types/cart";

interface CartItemCardProps {
  item: CartItem;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  return (
    <motion.div
      layout
      className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />

      <div className="flex-1">
        <h3 className="font-medium line-clamp-1">{item.name}</h3>
        <div className="flex gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>Color: {item.color}</span>
          <span>Talla: {item.size}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-gray-700 dark:text-gray-300">
            {item.quantity} × S/ {item.price.toFixed(2)}
          </span>
          <span className="font-semibold">S/ {(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
};
