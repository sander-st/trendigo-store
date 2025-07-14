import { useState, useCallback, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, X, Menu } from "lucide-react";
import { useCart } from "../../contexts/CartContextUtils";
import logo from "../../assets/trendigo-high-resolution-logo-transparent.png";

const NAV_ITEMS = [
  { name: "Inicio", href: "/", exact: true },
  { name: "Productos", href: "/category/all" },
  { name: "Contacto", href: "/contact" },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItemCount } = useCart();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Verificar si un item está activo
  const isActive = useCallback(
    (href: string, exact = false) => {
      return exact ? location.pathname === href : location.pathname.startsWith(href);
    },
    [location.pathname]
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full" aria-label="Cabecera principal">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="inline-block" aria-label="Ir a la página de inicio">
              <img
                src={logo}
                alt="Logo Trendigo"
                className="h-12 object-contain transition-all duration-300"
                width={160}
                height={48}
              />
            </Link>
          </div>

          {/* Navegación desktop */}
          <div className="hidden md:block">
            <ul className="ml-10 flex items-center space-x-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative
                      ${
                        isActive(item.href, item.exact)
                          ? "text-primary font-bold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-primary"
                          : "text-gray-700 hover:text-primary"
                      }`}
                    aria-current={isActive(item.href, item.exact) ? "page" : undefined}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Icono carrito y menú móvil */}
          <div className="flex items-center">
            <Link
              to="/cart"
              className="relative p-2 rounded-full text-gray-700 hover:text-primary transition-colors"
              aria-label={`Ver carrito de compras (${cartItemCount} items)`}>
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </span>
              )}
            </Link>

            {/* Botón menú móvil */}
            <button
              type="button"
              className="ml-4 md:hidden p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menú móvil con animación */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden
          ${isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
        <ul className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          {NAV_ITEMS.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors
                  ${
                    isActive(item.href, item.exact)
                      ? "bg-primary-light text-primary font-bold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                aria-current={isActive(item.href, item.exact) ? "page" : undefined}
                onClick={closeMenu}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};
