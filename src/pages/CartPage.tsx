import { useCart } from "../contexts/CartContextUtils";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CartSummary } from "../components/cart/CartSummary";
import { Button } from "../components/common/Button";
import { CartItemComponent } from "../components/cart/CartItem";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { TrustedMessages } from "../components/organism/TrustedMessages";

export const CartPage: React.FC = () => {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Mensaje persuasivo basado en contenido del carrito
  const persuasiveMessage = useMemo(() => {
    if (cartTotal >= 100) {
      return "¡Felicidades! Tienes envío GRATIS en tu pedido.";
    } else if (cartTotal > 0) {
      const missing = (100 - cartTotal).toFixed(2);
      return `¡Solo te faltan S/ ${missing} para obtener envío GRATIS!`;
    }
    return "";
  }, [cartTotal]);

  // Contador de productos únicos
  const uniqueProductsCount = useMemo(() => {
    return new Set(cartItems.map((item) => item.id)).size;
  }, [cartItems]);

  // NUEVO: Calcular el ahorro total de los productos
  const totalProductDiscount = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const productSaving = (item.regularPrice - item.price) * item.quantity;
      return acc + productSaving;
    }, 0);
  }, [cartItems]);

  return (
    <>
      <Helmet>
        <title>Tu Carrito | TRENDIGO</title>
        <meta
          name="description"
          content="Revisa los productos en tu carrito antes de completar tu compra en TRENDIGO."
        />
        <meta property="og:title" content="Tu Carrito | TRENDIGO" />
        <meta property="og:description" content="Revisa los productos en tu carrito antes de completar tu compra." />
        <meta property="og:url" content="https://trendigostore.netlify.app/cart" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3 text-center">
          🛒 Tu Carrito de Compras
        </motion.h1>

        {persuasiveMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-lg text-green-600 font-medium mb-6 bg-green-50 dark:bg-green-900/30 py-3 rounded-lg">
            {persuasiveMessage}
          </motion.div>
        )}

        {/* Mensajes de confianza */}
        <TrustedMessages />

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-xl h-32 animate-pulse"></div>
              ))}
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-64 animate-pulse"></div>
          </div>
        ) : cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md mx-auto text-center">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              Tu carrito está vacío. ¡Es hora de llenarlo con estilo!
            </p>
            <Link to="/category/all">
              <Button className="px-8 py-3 text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark">
                Explorar Colección
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {uniqueProductsCount} {uniqueProductsCount === 1 ? "producto" : "productos"} seleccionados
                </h2>
                <Link to="/category/all" className="text-primary hover:text-primary-dark font-medium">
                  Seguir comprando
                </Link>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItemComponent key={`${item.id}-${item.color}-${item.size}`} item={item} />
                ))}
              </div>
            </div>

            {/* Resumen + checkout */}
            <div className="lg:col-span-1">
              <CartSummary total={cartTotal} totalProductDiscount={totalProductDiscount} />
              <Button
                onClick={() => navigate("/checkout")}
                className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white flex items-center justify-center space-x-2 text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <span>Finalizar Compra</span>
                <ArrowRight className="w-5 h-5" />
              </Button>

              {/* Métodos de pago */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold mb-2">Métodos de pago aceptados:</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 rounded text-sm text-white">
                    Visa/Mastercard
                  </div>
                  <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-3 py-1 rounded text-sm text-white">
                    Yape/Plin
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-700 px-3 py-1 rounded text-sm text-white">
                    Contra Entrega
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
