import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useCart } from "../contexts/CartContextUtils";
import { Button } from "../components/common/Button";
import { Helmet } from "react-helmet-async";
import type { CustomerFormData } from "../types/customer";
import { buildWhatsAppLink } from "../utils/whatsapp";
import { CustomerForm } from "../components/forms/CustomerForm";
import { CartSummary } from "../components/cart/CartSummary";
import { ShieldCheck, MessageCircle, CheckCircle, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TrustedMessages } from "../components/organism/TrustedMessages";

export const CheckoutPage: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [totalAmount, setTotalAmount] = useState(cartTotal);
  const [showPopup, setShowPopup] = useState(false);
  const [customerData, setCustomerData] = useState<CustomerFormData | null>(null);

  // Calcular el ahorro total
  const totalProductDiscount = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const productSaving = (item.regularPrice - item.price) * item.quantity;
      return acc + productSaving;
    }, 0);
  }, [cartItems]);

  // Verificar si el carrito está vacío
  useEffect(() => {
    if (cartItems.length === 0 && !showConfirmation) {
      navigate("/cart");
    }
  }, [cartItems, navigate, showConfirmation]);

  const handleFormSubmit = async (data: CustomerFormData) => {
    setIsSubmitting(true);
    setCustomerData(data);
    const whatsappLink = buildWhatsAppLink(data, cartItems, cartTotal);

    try {
      const newWindow = window.open(whatsappLink, "_blank");
      if (newWindow) {
        newWindow.focus();
        setShowConfirmation(true);
        setTotalAmount(cartTotal);
        clearCart();
      } else {
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error al abrir WhatsApp:", error);
      setShowPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Página de confirmación
  if (showConfirmation) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto">
          <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-4">¡Pedido Confirmado con Éxito!</h1>

          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
            Tu pedido ha sido enviado a nuestro equipo. Estamos preparando todo para ti.
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 text-left max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Resumen de tu pedido
            </h2>

            <div className="space-y-3 mb-4">
              {cartItems.slice(0, 3).map((item) => (
                <div key={item.cartItemId} className="flex justify-between">
                  <span className="truncate max-w-[70%]">
                    {item.quantity}x {item.name}
                  </span>
                  <span>S/ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              {cartItems.length > 3 && (
                <div className="text-gray-500 text-sm">+{cartItems.length - 3} productos más</div>
              )}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 font-bold flex justify-between">
              <span>Total:</span>
              <span>S/ {totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            <span className="font-bold text-primary">¡Estamos emocionados por tu compra!</span>
            <br />
            Te contactaremos en WhatsApp en los próximos 15 minutos para coordinar la entrega.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="btn-outline">Volver al Inicio</Button>
            </Link>
            <Link to="/category/all">
              <Button className="bg-gradient-to-r from-primary to-secondary">Seguir Comprando</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Finalizar Compra | TRENDIGO</title>
        <meta name="description" content="Completa tus datos para recibir tus productos con envío rápido y seguro" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Barra de progreso */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -z-10"></div>
          <div className="flex flex-col items-center relative">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">1</div>
            <span className="mt-2 font-medium">Carrito</span>
          </div>
          <div className="flex flex-col items-center relative">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">2</div>
            <span className="mt-2 font-medium">Datos</span>
          </div>
          <div className="flex flex-col items-center relative">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 flex items-center justify-center">
              3
            </div>
            <span className="mt-2">Confirmación</span>
          </div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
          Completa tu Pedido
        </motion.h1>

        {/* Mensajes de confianza */}
        <TrustedMessages />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario de cliente */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Información de Contacto
              </h2>
              <p className="mt-1">Necesitamos tus datos para coordinar la entrega</p>
            </motion.div>

            <CustomerForm onSubmit={handleFormSubmit} isLoading={isSubmitting} />
          </div>

          {/* Resumen del pedido */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Resumen de tu Pedido
              </h2>
              <p className="mt-1">Revisa los productos antes de finalizar</p>
            </motion.div>

            <CartSummary total={cartTotal} totalProductDiscount={totalProductDiscount} />

            {/* Último producto agregado */}
          </div>
        </div>
      </div>

      {/* Popup para bloqueo de ventanas */}
      <AnimatePresence>
        {showPopup && customerData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full">
              <div className="text-center mb-6">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Atención Requerida</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Tu navegador bloqueó la ventana de WhatsApp. Por favor haz clic en el botón para continuar.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <a
                  href={buildWhatsAppLink(customerData, cartItems, cartTotal)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setShowPopup(false);
                    setShowConfirmation(true);
                    clearCart();
                  }}
                  className="btn btn-primary w-full">
                  Continuar en WhatsApp
                </a>

                <button onClick={() => setShowPopup(false)} className="btn btn-outline w-full">
                  Volver al Formulario
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
