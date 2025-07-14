export interface ClothingProductData {
  id: string;
  name: string;
  category: string;
  price: number;
  regularPrice: number;
  isOnSale: boolean;
  imageUrl: string; // Imagen principal
  hoverImageUrl?: string; // Imagen secundaria para hover en card
  images: string[]; // Galería en detalle (primera = principal)
  imagesCart: { [key: string]: string }; // Imágenes para el carrito
  description: string;
  shortDescription: string;
  specifications: { [key: string]: string | boolean };
  availableColors: string[];
  availableSizes: string[];
  stock: number; // Stock general
  variants: Array<{
    color: string;
    size: string;
    stock: number;
  }>;
  rating: number;
  reviewCount: number;
  testimonials: Array<{
    name: string;
    comment: string;
    rating: number;
  }>;
  createdAt: string;
}
