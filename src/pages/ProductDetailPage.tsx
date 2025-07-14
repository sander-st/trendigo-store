import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import type { ClothingProductData } from "../types/product";
import { fetchProductById } from "../utils/api";
import { ProductDetails } from "../components/product/ProductDetails";
import { Link } from "react-router-dom";

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ClothingProductData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProductById(id).then((data) => {
        setProduct(data || null);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        <p className="ml-4 text-xl text-gray-700 dark:text-gray-300">Cargando producto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-red-600">Producto no encontrado</h1>
        <p className="text-gray-600 mt-4">Lo sentimos, el producto que buscas no existe o ha sido retirado.</p>
        <Link to="/category/all" className="mt-6 inline-block text-primary hover:underline">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | TRENDIGO</title>
        <meta name="description" content={product.shortDescription} />
        <meta property="og:title" content={`${product.name} | TRENDIGO`} />
        <meta property="og:description" content={product.shortDescription} />
        <meta property="og:image" content={product.imageUrl} />
        <meta property="og:url" content={`https://trendigo.com/product/${product.id}`} />
        <meta name="twitter:card" content="summary_large_image" />
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.name,
            image: product.images,
            description: product.description,
            sku: product.id,
            brand: { "@type": "Brand", name: "TRENDIGO" },
            offers: {
              "@type": "Offer",
              url: `https://trendigo.com/product/${product.id}`,
              priceCurrency: "PEN",
              price: product.price.toFixed(2),
              itemCondition: "https://schema.org/NewCondition",
              availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              seller: { "@type": "Organization", name: "TRENDIGO" },
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating.toString(),
              reviewCount: product.reviewCount.toString(),
            },
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <ProductDetails product={product} />
      </div>
    </>
  );
};
