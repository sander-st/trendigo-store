import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { ClothingProductData } from "../types/product";
import { fetchProducts } from "../utils/api";
import { ClothingProductCard } from "../components/product/ClothingProduct";
import { CategoryCard } from "../components/home/CategoryCard";
import { TrendSection } from "../components/home/TrendSection";
import { TestimonialsSection } from "../components/home/TestimonialsSection";
import { NewsletterSignup } from "../components/home/NewsletterSignup";
import { BannerPromo } from "../components/common/BannerPromo";

// Imágenes para las categorías
import heroImage from "../assets/women-8750279_1920.webp";
import womenCategory from "../assets/women-fashion.webp";
import menCategory from "../assets/men-fashion.webp";
import kidsCategory from "../assets/kids-fashion.webp";
// import sportsCategory from "../assets/sports-fashion.webp";
// import accessoriesCategory from "../assets/accessories.webp";

// Categorías destacadas
const CATEGORIES = [
  {
    name: "Mujeres",
    slug: "mujeres",
    description: "Lo último en moda femenina",
    imageUrl: womenCategory,
  },
  {
    name: "Hombres",
    slug: "hombres",
    description: "Estilo urbano y deportivo",
    imageUrl: menCategory,
  },
  {
    name: "Niños",
    slug: "ninos",
    description: "Moda divertida para los más pequeños",
    imageUrl: kidsCategory,
  },
  // {
  //   name: "Deportes",
  //   slug: "deportes",
  //   description: "Rendimiento y comodidad",
  //   imageUrl: sportsCategory
  // },
  // {
  //   name: "Accesorios",
  //   slug: "accesorios",
  //   description: "Detalles que marcan la diferencia",
  //   imageUrl: accessoriesCategory
  // }
];

// Tendencias actuales
const CURRENT_TRENDS = [
  {
    name: "Street Style",
    description: "Moda urbana con actitud",
    tag: "Lo más buscado",
  },
  {
    name: "Athleisure",
    description: "Comodidad con estilo",
    tag: "En tendencia",
  },
  {
    name: "Minimalismo",
    description: "Menos es más",
    tag: "Clásico moderno",
  },
];

const HeroSection = () => (
  <section className="relative h-[70vh] flex items-center justify-center">
    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
    <img
      src={heroImage}
      alt="Estilo urbano TRENDIGO"
      className="absolute inset-0 w-full h-full object-cover object-center"
      loading="eager"
    />

    <div className="relative z-20 text-center px-4 max-w-4xl">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-xl">
        No Solo Ropa, <span className="text-primary">Una Identidad</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
        Descubre prendas que cuentan tu historia - donde cada detalle refleja quien eres
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}>
        <Link
          to="/category/all"
          aria-label="Explorar colección completa"
          className="btn btn-primary btn-lg hover:scale-105 transition-transform inline-flex items-center gap-2">
          Explorar Colección
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </motion.div>
    </div>
  </section>
);

const ProductLoader = ({ count = 4 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <div className="bg-gray-200 dark:bg-gray-700 h-64 animate-pulse" />
        <div className="p-4">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3 w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
          <div className="mt-4 flex justify-between">
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<ClothingProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError("Error cargando productos. Intente nuevamente.");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Productos destacados (los más valorados)
  const featuredProducts = products.filter((p) => p.rating >= 4).slice(0, 4);

  // Nuevos lanzamientos (los últimos agregados)
  const newArrivals = [...products]
    .sort((a, b) => new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime())
    .slice(0, 4);

  return (
    <>
      <Helmet>
        <title>TRENDIGO - Moda para Toda la Familia</title>
        <meta
          name="description"
          content="Descubre moda deportiva, urbana y elegante para mujeres, hombres y niños. Las últimas tendencias en ropa y accesorios."
        />
        <meta property="og:title" content="TRENDIGO - Moda para Toda la Familia" />
        <meta
          property="og:description"
          content="Explora nuestra colección completa de moda deportiva, urbana y accesorios."
        />
        <meta property="og:image" content={heroImage} />
        <meta property="og:url" content="https://trendigo.com/" />
        <link rel="canonical" href="https://trendigo.com/" />
      </Helmet>

      <HeroSection />

      {/* Categorías destacadas */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">Explora Nuestras Categorías</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Descubre moda para toda la familia, desde deportes hasta eventos especiales
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {CATEGORIES.map((category, index) => (
            <CategoryCard key={category.slug} category={category} delay={index * 0.1} />
          ))}
        </div>
      </section>

      {/* Productos destacados */}
      <section className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">Productos Destacados</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Los favoritos de nuestros clientes con las mejores valoraciones
            </p>
          </div>

          {error ? (
            <div className="alert alert-error max-w-md mx-auto">
              <div>
                <span>{error}</span>
                <button className="btn btn-sm btn-ghost" onClick={() => window.location.reload()}>
                  Reintentar
                </button>
              </div>
            </div>
          ) : loading ? (
            <ProductLoader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ClothingProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Banner promocional */}
      <BannerPromo
        title="Envío Gratis en Pedidos Mayores a S/150"
        subtitle="Compra ahora y recibe tu pedido en 24-48 horas"
        ctaText="Ver Ofertas"
        ctaLink="/category/all"
      />

      {/* Tendencias actuales */}
      <TrendSection trends={CURRENT_TRENDS} />

      {/* Nuevos lanzamientos */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">Nuevos Lanzamientos</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Descubre las últimas incorporaciones a nuestra colección
          </p>
        </div>

        {loading ? (
          <ProductLoader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ClothingProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Testimonios */}
      <TestimonialsSection />

      {/* Newsletter */}
      <NewsletterSignup />
    </>
  );
};
