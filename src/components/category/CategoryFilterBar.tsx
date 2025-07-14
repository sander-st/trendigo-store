import React, { useMemo } from "react";
import { X } from "lucide-react";

interface CategoryFilterBarProps {
  sortOrder: "default" | "price-asc" | "price-desc" | "popular";
  onSortChange: (order: "default" | "price-asc" | "price-desc" | "popular") => void;
  productCount: number;
  filterOptions: {
    sizes: string[];
    colors: string[];
  };
  activeFilters: { [key: string]: string[] };
  onFilterChange: (filterType: string, value: string) => void;
  showOnlySale: boolean;
  onShowSaleChange: (value: boolean) => void;
  onClearFilters: () => void;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = React.memo(
  ({
    sortOrder,
    onSortChange,
    productCount,
    filterOptions,
    activeFilters,
    onFilterChange,
    showOnlySale,
    onShowSaleChange,
    onClearFilters,
  }) => {
    const hasActiveFilters = useMemo(() => {
      return Object.values(activeFilters).some((arr) => arr.length > 0) || showOnlySale;
    }, [activeFilters, showOnlySale]);

    return (
      <div className="mb-8">
        {/* Contador y filtros activos */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="text-gray-700 dark:text-gray-300">
            <span className="font-bold">{productCount}</span>{" "}
            {productCount === 1 ? "producto encontrado" : "productos encontrados"}
          </div>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center text-sm text-red-600 hover:text-red-800 dark:hover:text-red-400">
              <X className="w-4 h-4 mr-1" /> Limpiar todos los filtros
            </button>
          )}
        </div>

        {/* Filtros activos (pills) */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-4">
            {showOnlySale && (
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center">
                Solo ofertas <X className="w-4 h-4 ml-2 cursor-pointer" onClick={() => onShowSaleChange(false)} />
              </div>
            )}

            {Object.entries(activeFilters).map(([filterType, values]) =>
              values.map((value) => (
                <div
                  key={`${filterType}-${value}`}
                  className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                  {filterType === "size" ? "Talla: " : "Color: "}
                  <span className="font-medium ml-1">{value}</span>
                  <X className="w-4 h-4 ml-2 cursor-pointer" onClick={() => onFilterChange(filterType, value)} />
                </div>
              ))
            )}
          </div>
        )}

        {/* Controles de filtro */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          {/* Filtro de ofertas */}
          <div className="flex items-start">
            <input
              type="checkbox"
              id="only-sale"
              checked={showOnlySale}
              onChange={(e) => onShowSaleChange(e.target.checked)}
              className="mr-2 h-4 w-4 text-primary rounded focus:ring-primary"
            />
            <label htmlFor="only-sale" className="text-gray-700 dark:text-gray-300">
              Mostrar solo ofertas
            </label>
          </div>

          {/* Filtro por talla */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Talla</label>
            <div className="flex flex-wrap gap-2">
              {filterOptions.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => onFilterChange("size", size)}
                  className={`px-3 py-1 text-sm rounded-full border ${
                    activeFilters.size?.includes(size)
                      ? "bg-primary text-white border-primary"
                      : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                  }`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro por color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label>
            <div className="flex flex-wrap gap-2">
              {filterOptions.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => onFilterChange("color", color)}
                  className={`px-3 py-1 text-sm rounded-full border ${
                    activeFilters.color?.includes(color)
                      ? "bg-primary text-white border-primary"
                      : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                  }`}>
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Ordenamiento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ordenar por</label>
            <select
              value={sortOrder}
              onChange={(e) => onSortChange(e.target.value as "default" | "price-asc" | "price-desc" | "popular")}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <option value="default">Relevancia</option>
              <option value="popular">Más populares</option>
              <option value="price-asc">Precio: Menor a mayor</option>
              <option value="price-desc">Precio: Mayor a menor</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
);
