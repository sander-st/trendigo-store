export interface CategoryData {
  slug: string;
  name: string;
  description: string;
}

export const categoriesData: CategoryData[] = [
  {
    slug: "conjuntos-deportivos",
    name: "Conjuntos Deportivos",
    description: "Conjuntos premium para entrenar o vestir con estilo urbano.",
  },
  {
    slug: "camisetas",
    name: "Camisetas",
    description: "Camisetas técnicas y urbanas que combinan confort y diseño.",
  },
  {
    slug: "sudaderas",
    name: "Sudaderas",
    description: "Sudaderas minimalistas para un look casual o deportivo.",
  },
  {
    slug: "all",
    name: "Todos los Productos",
    description: "Explora toda nuestra colección TRENDIGO.",
  },
];
