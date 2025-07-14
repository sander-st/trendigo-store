// src/components/cart/CartSummary.tsx

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface CartSummaryProps {
  total: number;
  totalProductDiscount: number; // NUEVO: Prop para el ahorro total de los productos
}

export const CartSummary: React.FC<CartSummaryProps> = ({ total, totalProductDiscount }) => {
  const shippingCost = 15;
  const freeShippingThreshold = 100;
  const hasFreeShipping = total >= freeShippingThreshold;

  const totalShippingDiscount = hasFreeShipping ? shippingCost : 0;

  // Cálculo del ahorro total combinado
  const totalSavings = totalProductDiscount + totalShippingDiscount;

  const finalTotal = total + (hasFreeShipping ? 0 : shippingCost);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-primary/20">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
        Resumen de Compra
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-700 dark:text-gray-300">Subtotal:</span>
          <span className="font-medium text-gray-800 dark:text-gray-100">S/ {total.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-700 dark:text-gray-300">Envío:</span>
          <span className={`font-medium ${hasFreeShipping ? "text-green-600" : "text-gray-800 dark:text-gray-100"}`}>
            {hasFreeShipping ? "¡Gratis!" : `S/ ${shippingCost.toFixed(2)}`}
          </span>
        </div>
      </div>

      {/* Sección del Ahorro Total */}
      {totalSavings > 0 && (
        <div className="flex justify-between items-center mt-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 font-bold">
          <span>🎉 ¡Ahorro Total!</span>
          <span>S/ {totalSavings.toFixed(2)}</span>
        </div>
      )}

      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <span className="text-xl font-bold text-gray-800 dark:text-gray-100">Total:</span>
        <motion.span
          key={finalTotal}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-2xl font-bold text-primary">
          S/ {finalTotal.toFixed(2)}
        </motion.span>
      </div>

      <ul className="mt-6 space-y-3">
        <li className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <span className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Pago contra entrega:</span> Solo pagas al recibir tu pedido
          </span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <span className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Garantía de satisfacción:</span> 30 días para cambios o devoluciones
          </span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <span className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Soporte prioritario:</span> Asesoramiento personalizado post-compra
          </span>
        </li>
      </ul>
    </motion.div>
  );
};
