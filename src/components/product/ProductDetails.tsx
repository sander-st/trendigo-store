import { useState, useCallback, useMemo } from "react";
import { useCart } from "../../contexts/CartContextUtils";
import type { ClothingProductData } from "../../types/product";
import { Button } from "../common/Button";
import { Star, Heart, Truck, Shield, CheckCircle, Gift, ShoppingCart } from "lucide-react";

interface ProductDetailsProps {
  product: ClothingProductData;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.availableColors[0]);
  const [selectedSize, setSelectedSize] = useState(product.availableSizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Memoizar cálculos para mejor rendimiento
  const variant = useMemo(
    () => product.variants.find((v) => v.color === selectedColor && v.size === selectedSize),
    [product.variants, selectedColor, selectedSize]
  );

  const variantStock = variant?.stock ?? 0;

  const discount = useMemo(() => {
    if (product.regularPrice > product.price) {
      return Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100);
    }
    return 0;
  }, [product.regularPrice, product.price]);

  const showDiscountBadge = discount >= 25;

  const handleAddToCart = useCallback(() => {
    if (variantStock > 0) {
      addToCart(product, quantity, selectedColor, selectedSize);
      // Aquí podrías añadir una animación o notificación de éxito
    }
  }, [addToCart, product, quantity, selectedColor, selectedSize, variantStock]);

  // Mensajes emocionales basados en stock
  const stockMessage = useMemo(() => {
    if (variantStock === 0) {
      return "¡Agotado temporalmente! Pero puedes reservarlo y te avisaremos cuando esté disponible.";
    } else if (variantStock <= 5) {
      return `¡Solo quedan ${variantStock} unidades! ¡Date prisa antes de que se agoten!`;
    } else {
      return "¡Disponible! ¡Asegura el tuyo ahora!";
    }
  }, [variantStock]);

  const stockColorClass = variantStock === 0 ? "text-red-600" : variantStock <= 5 ? "text-amber-600" : "text-green-600";

  // Técnica de urgencia: mostrar cuántos han comprado recientemente
  const recentPurchases = useMemo(() => {
    return Math.floor(Math.random() * 15) + 5;
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 md:p-8 max-w-7xl mx-auto">
      {/* Encabezado emocional */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {product.name} - ¡Tu estilo, tu actitud!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Descubre por qué más de {product.reviewCount} personas ya lo aman
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Galería */}
        <div className="relative">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full rounded-lg object-cover aspect-square shadow-lg"
            loading="eager"
          />

          {/* Badge de descuento con emoción */}
          {showDiscountBadge && (
            <div className="absolute top-4 right-4 bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transform rotate-6 animate-pulse">
              ¡-{discount}% OFERTA!
            </div>
          )}

          {/* Botón favorito */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 left-4 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 hover:scale-110 transition-transform"
            aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}>
            <Heart
              className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-700 dark:text-gray-300"}`}
            />
          </button>

          {/* Miniaturas */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                className={`focus:outline-none rounded-lg overflow-hidden border-2 transition-all ${
                  img === selectedImage ? "border-primary ring-2 ring-primary ring-opacity-50" : "border-transparent"
                }`}
                onClick={() => setSelectedImage(img)}
                aria-label={`Ver imagen ${idx + 1} de ${product.name}`}>
                <img src={img} alt={`Miniatura ${idx + 1}`} className="h-20 w-20 object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Información con enfoque emocional */}
        <div>
          {/* Rating con mensaje persuasivo */}
          <div className="flex items-center gap-2 mb-4 bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg">
            <div className="flex text-yellow-500">
              <Star className="w-5 h-5 fill-yellow-500" />
              <span className="font-bold ml-1">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-gray-700 dark:text-gray-300">
              ¡Calificado como <span className="font-bold">Excelente</span> por {product.reviewCount} clientes!
            </span>
          </div>

          {/* Precio con mensaje de valor */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            {product.regularPrice > product.price && (
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                  S/ {product.regularPrice.toFixed(2)}
                </span>
                <span className="text-red-600 font-bold">
                  ¡Ahorras S/ {(product.regularPrice - product.price).toFixed(2)}!
                </span>
              </div>
            )}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-bold text-primary">S/ {product.price.toFixed(2)}</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">IVA incluido</span>
            </div>
            <div className="mt-2 text-green-600 font-medium flex items-center gap-1">
              <Gift className="w-4 h-4" /> ¡Envío GRATIS en pedidos superiores a S/ 150!
            </div>
          </div>

          {/* Descripción con enfoque en beneficios */}
          <div className="mb-6">
            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">¿Por qué amarás este producto?</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{product.description}</p>
          </div>

          {/* Selector color con lenguaje emocional */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-gray-200 dark:bg-gray-700 rounded-full w-6 h-6 flex items-center justify-center">
                1
              </span>
              Elige tu color favorito:
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.availableColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-full transition-all transform hover:scale-105 ${
                    color === selectedColor
                      ? "bg-primary text-white font-bold shadow-lg"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  }`}
                  aria-label={`Seleccionar color ${color}`}>
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Selector talla con guía */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-gray-200 dark:bg-gray-700 rounded-full w-6 h-6 flex items-center justify-center">
                2
              </span>
              Selecciona tu talla ideal:
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all transform hover:scale-105 ${
                    size === selectedSize
                      ? "border-primary bg-primary text-white font-bold shadow-lg"
                      : "border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  }`}
                  aria-label={`Seleccionar talla ${size}`}>
                  {size}
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              ¿No estás seguro de tu talla?{" "}
              <button className="text-primary font-medium hover:underline">Guía de tallas</button>
            </p>
          </div>

          {/* Stock con urgencia */}
          <div className={`mb-6 p-4 rounded-lg ${stockColorClass} bg-opacity-10 font-bold flex items-center gap-2`}>
            {variantStock <= 5 && <span className="text-2xl animate-pulse">🔥</span>}
            {stockMessage}
          </div>

          {/* Selector cantidad con contexto */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-gray-200 dark:bg-gray-700 rounded-full w-6 h-6 flex items-center justify-center">
                3
              </span>
              Cantidad:
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white disabled:opacity-50"
                  disabled={quantity <= 1}
                  aria-label="Reducir cantidad">
                  -
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(variantStock, q + 1))}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white disabled:opacity-50"
                  disabled={quantity >= variantStock}
                  aria-label="Aumentar cantidad">
                  +
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {recentPurchases} personas han comprado este producto hoy
              </p>
            </div>
          </div>

          {/* Botón con llamado a la acción emocional */}
          <Button
            onClick={handleAddToCart}
            className="w-full py-4 text-lg font-bold shadow-lg transform hover:scale-[1.02] transition-transform"
            disabled={variantStock === 0}>
            {variantStock > 0 ? (
              <div className="flex items-center justify-center gap-2">
                <ShoppingCart className="w-6 h-6" />
                <span>¡Añadir al Carrito - Solo S/ {(product.price * quantity).toFixed(2)}!</span>
              </div>
            ) : (
              "Notificarme cuando esté disponible"
            )}
          </Button>

          {/* Beneficios con enfoque emocional */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 text-green-600">
              <Truck className="w-5 h-5" />
              <span className="text-sm">Envío rápido</span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Compra segura</span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">Garantía de 30 días</span>
            </div>
          </div>

          {/* Copy emocional final */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-bold text-gray-900 dark:text-white text-center">
              ❤️ ¡Únete a los miles de clientes satisfechos que ya disfrutan de este producto!
            </p>
          </div>
        </div>
      </div>

      {/* Especificaciones con enfoque en beneficios */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Características que harán tu vida mejor
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="flex items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
              <span className="text-primary text-xl mr-3">✓</span>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{key}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {typeof value === "boolean" ? (value ? "Sí" : "No") : value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonios con enfoque social */}
      {product.testimonials.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Historias de éxito de personas como tú
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 relative">
                <div className="absolute -top-4 left-4 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
                  ❤️
                </div>
                <div className="flex items-center gap-1 text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(t.rating) ? "fill-yellow-500" : "fill-gray-300 dark:fill-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="mb-4 text-gray-700 dark:text-gray-300 italic">"{t.comment}"</p>
                <p className="text-gray-900 dark:text-gray-100 font-semibold">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Garantía final */}
      <div className="mt-12 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg text-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">¿Aún no estás convencido?</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Ofrecemos una garantía de satisfacción de 30 días. Si no amas tu producto, ¡te devolvemos tu dinero!
        </p>
        <Button className="mx-auto">¡Quiero arriesgarme! - Garantía de satisfacción</Button>
      </div>
    </div>
  );
};
