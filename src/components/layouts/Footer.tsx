import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
  Gift,
} from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Sección superior con información útil */}
      <div className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Contacto y dirección */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-primary">TRENDIGO</span>
              </h3>
              <p className="text-gray-400 mb-4">
                Tu destino para moda deportiva, urbana y las últimas tendencias para toda la familia.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Av. Moda 123, Lima, Perú</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>(+51) 987 654 321</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>hola@trendigo.com</span>
                </div>
              </div>
            </div>

            {/* Enlaces rápidos */}
            <div>
              <h4 className="text-lg font-semibold mb-4 border-l-4 border-primary pl-3">Navegación</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-primary transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/category/mujeres" className="text-gray-400 hover:text-primary transition-colors">
                    Mujeres
                  </Link>
                </li>
                <li>
                  <Link to="/category/hombres" className="text-gray-400 hover:text-primary transition-colors">
                    Hombres
                  </Link>
                </li>
                <li>
                  <Link to="/category/ninos" className="text-gray-400 hover:text-primary transition-colors">
                    Niños
                  </Link>
                </li>
                <li>
                  <Link to="/category/deportes" className="text-gray-400 hover:text-primary transition-colors">
                    Deportes
                  </Link>
                </li>
                <li>
                  <Link to="/category/novedades" className="text-gray-400 hover:text-primary transition-colors">
                    Nuevas Tendencias
                  </Link>
                </li>
              </ul>
            </div>

            {/* Ayuda y soporte */}
            <div>
              <h4 className="text-lg font-semibold mb-4 border-l-4 border-primary pl-3">Ayuda</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-400 hover:text-primary transition-colors">
                    Preguntas Frecuentes
                  </Link>
                </li>
                <li>
                  <Link to="/shipping" className="text-gray-400 hover:text-primary transition-colors">
                    Envíos y Entregas
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="text-gray-400 hover:text-primary transition-colors">
                    Devoluciones
                  </Link>
                </li>
                <li>
                  <Link to="/size-guide" className="text-gray-400 hover:text-primary transition-colors">
                    Guía de Tallas
                  </Link>
                </li>
              </ul>
            </div>

            {/* Boletín informativo */}
            <div>
              <h4 className="text-lg font-semibold mb-4 border-l-4 border-primary pl-3">Suscríbete</h4>
              <p className="text-gray-400 mb-4">Recibe las últimas tendencias, ofertas exclusivas y novedades.</p>

              <form className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button type="submit" className="btn btn-primary mt-2">
                  Suscribirme
                </button>
              </form>

              <div className="mt-4">
                <h5 className="font-medium mb-2">Síguenos</h5>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com/trendigo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-pink-500 transition-colors"
                    aria-label="Instagram">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="https://facebook.com/trendigo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                    aria-label="Facebook">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="https://twitter.com/trendigo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                    aria-label="Twitter">
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a
                    href="https://youtube.com/trendigo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-600 transition-colors"
                    aria-label="YouTube">
                    <Youtube className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de garantías */}
      <div className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 justify-center">
              <Truck className="w-8 h-8 text-primary" />
              <div>
                <h5 className="font-semibold">Envío Rápido</h5>
                <p className="text-sm text-gray-400">A todo el Perú</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <div>
                <h5 className="font-semibold">Compra Segura</h5>
                <p className="text-sm text-gray-400">Protegemos tus datos</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <CreditCard className="w-8 h-8 text-primary" />
              <div>
                <h5 className="font-semibold">Pago Seguro</h5>
                <p className="text-sm text-gray-400">Múltiples métodos</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Gift className="w-8 h-8 text-primary" />
              <div>
                <h5 className="font-semibold">Garantía</h5>
                <p className="text-sm text-gray-400">30 días de devolución</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de métodos de pago */}
      <div className="border-b border-gray-700 py-6">
        <div className="container mx-auto px-4">
          <h5 className="text-center font-medium mb-4">Métodos de Pago Aceptados</h5>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="bg-gray-800 p-2 rounded-md">Visa</div>
            <div className="bg-gray-800 p-2 rounded-md">Mastercard</div>
            <div className="bg-gray-800 p-2 rounded-md">PayPal</div>
            <div className="bg-gray-800 p-2 rounded-md">Yape</div>
            <div className="bg-gray-800 p-2 rounded-md">Plin</div>
            <div className="bg-gray-800 p-2 rounded-md">Efectivo</div>
          </div>
        </div>
      </div>

      {/* Sección inferior */}
      <div className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center">
              &copy; {currentYear} TRENDIGO. Todos los derechos reservados.
            </p>

            <div className="flex gap-4 text-sm">
              <Link to="/terms" className="text-gray-500 hover:text-primary transition-colors">
                Términos y Condiciones
              </Link>
              <Link to="/privacy" className="text-gray-500 hover:text-primary transition-colors">
                Política de Privacidad
              </Link>
              <Link to="/cookies" className="text-gray-500 hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
