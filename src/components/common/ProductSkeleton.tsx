import React from "react";

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden animate-pulse">
      {/* Imagen */}
      <div className="relative aspect-square bg-gray-200 dark:bg-gray-700" />

      {/* Contenido */}
      <div className="p-4">
        {/* Nombre y categoría */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-1/2" />

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-10 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

        {/* Precio */}
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/3" />

        {/* Botón */}
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
};
