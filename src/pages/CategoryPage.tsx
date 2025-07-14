import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import type { ClothingProductData } from "../types/product";
import { fetchProducts } from "../utils/api";
import { categoriesData } from "../data/categoriesData";
import { CategoryFilterBar } from "../components/category/CategoryFilterBar";
import { ClothingProductCard } from "../components/product/ClothingProduct";
import { ProductSkeleton } from "../components/common/ProductSkeleton";
import { BannerPromo } from "../components/common/BannerPromo";

export const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [products, setProducts] = useState<ClothingProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"default" | "price-asc" | "price-desc" | "popular">("default");
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: string[] }>({});
  const [showOnlySale, setShowOnlySale] = useState(false);

  // Buscar datos de la categoría
  const currentCategory = useMemo(() => {
    return (
      categoriesData.find((cat) => cat.slug === categorySlug) || {
        name: "Categoría",
        description: "Descubre nuestra colección premium",
      }
    );
  }, [categorySlug]);

  // Mensaje persuasivo basado en categoría
  const categoryPersuasiveMessages = useMemo(() => {
    const messages: Record<string, string> = {
      "conjuntos-deportivos": "¡Viste como un profesional con nuestros conjuntos premium!",
      camisetas: "Camisetas que combinan estilo y comodidad para tu día a día",
      sudaderas: "Abrígate con estilo con nuestras sudaderas de última generación",
      all: "Descubre todo lo que tenemos para ofrecerte",
    };
    return messages[categorySlug || "all"] || "Explora nuestra colección exclusiva";
  }, [categorySlug]);

  // Cargar productos
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchProducts()
      .then((data) => {
        const filtered =
          categorySlug === "all" || !categorySlug
            ? data
            : data.filter((p) => p.category.toLowerCase().replace(/\s/g, "-") === categorySlug);
        setProducts(filtered);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al cargar los productos. Por favor, intenta de nuevo.");
        setLoading(false);
        console.error("API Error:", err);
      });
  }, [categorySlug]);

  // Ordenar y filtrar productos
  const sortedAndFilteredProducts = useMemo(() => {
    let result = [...products];

    // Aplicar filtros
    if (showOnlySale) {
      result = result.filter((p) => p.isOnSale);
    }

    Object.entries(activeFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        result = result.filter((p) => {
          if (key === "size") return values.some((v) => p.availableSizes.includes(v));
          if (key === "color") return values.some((v) => p.availableColors.includes(v));
          return true;
        });
      }
    });

    // Aplicar ordenamiento
    switch (sortOrder) {
      case "price-asc":
        return result.sort((a, b) => a.price - b.price);
      case "price-desc":
        return result.sort((a, b) => b.price - a.price);
      case "popular":
        return result.sort((a, b) => b.reviewCount - a.reviewCount);
      default:
        return result;
    }
  }, [products, sortOrder, activeFilters, showOnlySale]);

  // Manejar cambios de filtro
  const handleFilterChange = useCallback((filterType: string, value: string) => {
    setActiveFilters((prev) => {
      const currentValues = prev[filterType] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      console.log({ ...prev, [filterType]: newValues });
      return {
        ...prev,
        [filterType]: newValues,
      };
    });
  }, []);

  // Limpiar filtros
  const clearFilters = useCallback(() => {
    setActiveFilters({});
    setShowOnlySale(false);
  }, []);

  // Obtener opciones únicas de filtro
  const filterOptions = useMemo(() => {
    const sizes = new Set<string>();
    const colors = new Set<string>();

    products.forEach((product) => {
      product.availableSizes.forEach((size) => sizes.add(size));
      product.availableColors.forEach((color) => colors.add(color));
    });

    return {
      sizes: Array.from(sizes),
      colors: Array.from(colors),
    };
  }, [products]);

  return (
    <>
      <Helmet>
        <title>{currentCategory.name} | TRENDIGO</title>
        <meta name="description" content={currentCategory.description} />
        <meta property="og:title" content={`${currentCategory.name} | TRENDIGO`} />
        <meta property="og:description" content={currentCategory.description} />
        <meta property="og:url" content={`https://trendigo.com/category/${categorySlug}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Banner promocional de categoría */}
      <BannerPromo
        title={currentCategory.name}
        subtitle={categoryPersuasiveMessages}
        ctaText="Ver colección completa"
      />

      <div className="container mx-auto px-4 py-8">
        <CategoryFilterBar
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          productCount={sortedAndFilteredProducts.length}
          filterOptions={filterOptions}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          showOnlySale={showOnlySale}
          onShowSaleChange={setShowOnlySale}
          onClearFilters={clearFilters}
        />

        {error ? (
          <div className="text-center py-12">
            <div className="text-red-500 font-medium mb-4">{error}</div>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Reintentar
            </button>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : sortedAndFilteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedAndFilteredProducts.map((product) => (
                <ClothingProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Categorías relacionadas */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">También te puede interesar</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categoriesData
                  .filter((cat) => cat.slug !== categorySlug)
                  .slice(0, 4)
                  .map((category) => (
                    <a
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{category.description}</div>
                    </a>
                  ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-4">
              No encontramos productos con estos filtros
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Prueba ajustando tus criterios de búsqueda o explorando otras categorías
            </p>
            <button className="btn btn-primary" onClick={clearFilters}>
              Limpiar todos los filtros
            </button>
          </div>
        )}
      </div>
    </>
  );
};
