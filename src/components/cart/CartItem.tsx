import { useCart } from "../../contexts/CartContextUtils";
import { Button } from "../common/Button";
import type { CartItem } from "../../types/cart";
import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface CartItemProps {
  item: CartItem;
}

export const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = (value: number) => {
    if (value <= item.variantStock) {
      updateQuantity(item.cartItemId, value);
    } else {
      console.log("No se actualizó la cantidad");
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => removeFromCart(item.cartItemId), 300);
  };

  const isLowStock = item.variantStock <= 5 && item.variantStock > 0;
  const isOutOfStock = item.variantStock === 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isRemoving ? 0 : 1,
        y: isRemoving ? -20 : 0,
        scale: isRemoving ? 0.95 : 1,
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`
        flex flex-col sm:flex-row md:grid md:grid-cols-4 md:items-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 md:p-6 gap-6 relative
        ${isOutOfStock ? "opacity-50" : ""}
      `}>
      {/* Columna 1: Imagen del producto y enlace */}
      <Link to={`/product/${item.id}`} className="flex-shrink-0 md:col-span-1">
        <img
          src={item.imagesCart[item.color.toLocaleLowerCase()]}
          alt={item.name}
          className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl hover:opacity-90 transition-opacity"
          loading="lazy"
        />
      </Link>

      {/* Columna 2: Detalles del producto */}
      <div className="flex-grow w-full md:col-span-1">
        <Link to={`/product/${item.id}`} className="block">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 hover:text-primary transition-colors">
            {item.name}
          </h3>
          <div className="flex flex-wrap gap-2 my-2">
            <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
              Color: {item.color}
            </span>
            <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
              Talla: {item.size}
            </span>
          </div>
        </Link>

        <p className="text-gray-700 dark:text-gray-300 font-medium">S/ {item.price.toFixed(2)} c/u</p>

        {item.regularPrice > item.price && (
          <p className="text-green-600 font-semibold text-sm mt-1">
            ¡Ahorras S/ {((item.regularPrice - item.price) * item.quantity).toFixed(2)}! en tu compra.
          </p>
        )}
      </div>

      {/* Columna 3: Controles de cantidad */}
      <div className="md:col-span-1 flex justify-start md:justify-center items-center">
        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-full h-8">
          <Button
            // NUEVO: Botones con fondo transparente y cambio de color del ícono en hover
            className="w-8 h-8 p-0 !bg-transparent border-none text-gray-600 hover:text-primary rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleQuantityChange(item.quantity - 1);
            }}
            aria-label="Reducir cantidad"
            disabled={item.quantity <= 1 || isOutOfStock}>
            <Minus className="w-4 h-4" />
          </Button>
          <span className="px-4 font-semibold text-base min-w-[40px] text-center">{item.quantity}</span>
          <Button
            // NUEVO: Botones con fondo transparente y cambio de color del ícono en hover
            className="w-8 h-8 p-0 !bg-transparent border-none text-gray-600 hover:text-primary rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleQuantityChange(item.quantity + 1);
            }}
            aria-label="Aumentar cantidad"
            disabled={item.quantity >= item.variantStock || isOutOfStock}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Columna 4: Subtotal y mensaje de escasez/agotado */}
      <div className="flex flex-col md:col-span-1 justify-center items-start md:items-end w-full">
        <div className="text-xl font-bold text-primary">S/ {(item.price * item.quantity).toFixed(2)}</div>
        {isLowStock && (
          <div className="flex items-center gap-1 text-orange-500 font-semibold text-sm mt-1 animate-pulse">
            <p>🔥 ¡Solo quedan {item.variantStock} unidades!</p>
          </div>
        )}
        {isOutOfStock && (
          <div className="flex items-center gap-1 text-red-500 font-semibold text-sm mt-1">
            <p>😞 ¡Agotado!</p>
          </div>
        )}
      </div>

      {/* Botón de eliminar */}
      <Button
        onClick={(e) => {
          e.stopPropagation();
          handleRemove();
        }}
        // NUEVO: Botón transparente y cambio de color del ícono en hover
        className="absolute top-4 right-4 p-2 border-none shadow-none bg-transparent text-gray-400 hover:text-red-500 rounded-full transition-colors"
        aria-label="Eliminar producto">
        <Trash2 className="w-5 h-5" />
      </Button>
    </motion.div>
  );
};
