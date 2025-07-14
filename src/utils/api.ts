import type { ClothingProductData } from "../types/product";
import mockProducts from "../data/clothingProduct.json";

// Simula la obtención de datos de productos

export const fetchProducts = (): Promise<ClothingProductData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.parse(JSON.stringify(mockProducts)));
    }, 500); // Simula un retraso de red
  });
};

export const fetchProductById = (id: string): Promise<ClothingProductData | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.parse(JSON.stringify(mockProducts)).find((p: ClothingProductData) => p.id === id));
    }, 300);
  });
};
