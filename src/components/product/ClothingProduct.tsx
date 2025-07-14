import { useState, useCallback, useMemo } from "react";
import { ShoppingCart, Star, Heart, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ClothingProductData } from "../../types/product";
import { Button } from "../common/Button";
// import { useCart } from "../../contexts/CartContextUtils";

interface ProductCardProps {
  product: ClothingProductData;
}

export const ClothingProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Memoizar cálculos para mejor rendimiento
  const discount = useMemo(() => {
    if (product.regularPrice && product.regularPrice > product.price) {
      return Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100);
    }
    return 0;
  }, [product.regularPrice, product.price]);

  const isHotItem = useMemo(() => {
    return product.reviewCount > 50 && product.rating >= 4.5;
  }, [product.reviewCount, product.rating]);

  const stockStatus = useMemo(() => {
    if (product.stock === 0) return "agotado";
    if (product.stock <= 5) return "bajo";
    return "disponible";
  }, [product.stock]);

  // const handleAddToCart = useCallback(
  //   (e: React.MouseEvent) => {
  //     e.stopPropagation();
  //     addToCart(product);
  //   },
  //   [addToCart, product]
  // );

  const navigateToProduct = useCallback(() => {
    navigate(`/product/${product.id}`);
  }, [navigate, product.id]);

  const toggleHover = useCallback(
    (hoverState: boolean) => () => {
      setIsHovered(hoverState);
    },
    []
  );

  const toggleFavorite = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  }, []);

  const imageUrl = isHovered && product.hoverImageUrl ? product.hoverImageUrl : product.imageUrl;

  // Mensajes emocionales basados en stock
  const stockMessage = useMemo(() => {
    if (product.stock === 0) return "¡Agotado! Notifícame cuando esté disponible";
    if (product.stock <= 5) return `¡Solo quedan ${product.stock} unidades!`;
    return "¡Disponible! Añade a tu carrito";
  }, [product.stock]);

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`Ver detalles de ${product.name}`}
      className="group relative w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
      onClick={navigateToProduct}
      onMouseEnter={toggleHover(true)}
      onMouseLeave={toggleHover(false)}
      onKeyDown={(e) => e.key === "Enter" && navigateToProduct()}>
      {/* Badges superpuestos */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {discount > 0 && (
          <div className="badge bg-red-600 text-white font-bold py-2 px-3 shadow-lg transform -rotate-6">
            ¡-{discount}% OFF!
          </div>
        )}

        {isHotItem && (
          <div className="badge bg-amber-500 text-white font-bold py-2 px-3 shadow-lg transform rotate-3">
            <Zap className="w-4 h-4 mr-1" /> ¡LO MÁS VENDIDO!
          </div>
        )}

        {stockStatus === "bajo" && (
          <div className="badge bg-orange-500 text-white font-bold py-2 px-3 shadow-lg">¡ÚLTIMAS UNIDADES!</div>
        )}
      </div>

      {/* Botón favorito */}
      <button
        onClick={toggleFavorite}
        className="absolute top-3 right-3 z-10 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:scale-110 transition-transform"
        aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}>
        <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-700 dark:text-gray-300"}`} />
      </button>

      {/* Imagen del producto */}
      <figure className="relative aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Overlay para el botón de carrito en hover */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            aria-label={`Agregar ${product.name} al carrito`}
            className="btn-primary transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            onClick={() => navigate(`/product/${product.id}`)}>
            <ShoppingCart className="w-4 h-4 mr-1" />
            ¡Lo quiero!
          </Button>
        </div>
      </figure>

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        {/* Nombre y categoría */}
        <div className="mb-2">
          <h2 className="font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{product.category}</p>
        </div>

        {/* Rating y reviews */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-yellow-500">
            <Star className="w-4 h-4 fill-yellow-500" />
            <span className="font-bold ml-1">{product.rating.toFixed(1)}</span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviewCount} reseñas)</span>

          {isHotItem && (
            <span className="ml-2 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded-full">
              ⭐ Top ventas
            </span>
          )}
        </div>

        {/* Descripción breve */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3 min-h-[2.5rem]">
          {product.shortDescription}
        </p>

        {/* Precios y stock */}
        <div className="flex flex-wrap items-end justify-between gap-2 mb-3">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900 dark:text-white">S/ {product.price.toFixed(2)}</span>

              {product.regularPrice && product.regularPrice > product.price && (
                <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
                  S/ {product.regularPrice.toFixed(2)}
                </span>
              )}
            </div>

            {discount > 0 && (
              <span className="text-xs text-red-600 font-bold">
                ¡Ahorras S/ {(product.regularPrice - product.price).toFixed(2)}!
              </span>
            )}
          </div>

          <div
            className={`text-xs font-bold px-2 py-1 rounded ${
              stockStatus === "agotado"
                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                : stockStatus === "bajo"
                ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
            }`}>
            {stockMessage}
          </div>
        </div>

        {/* Botón de acción */}
        <Button
          aria-label={`Agregar ${product.name} al carrito`}
          className="btn-primary w-full gap-2 font-semibold group-hover:hidden"
          onClick={() => navigate(`/product/${product.id}`)}>
          <ShoppingCart className="w-4 h-4" />
          {stockStatus === "agotado" ? "Agotado" : "Agregar al carrito"}
        </Button>
      </div>
    </article>
  );
};
