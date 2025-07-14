import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/layouts/Header";
import { HomePage } from "./pages/HomePage";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "./contexts/CartContexts";
import { Footer } from "./components/layouts/Footer";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PrivacyPage, ReturnsPage, TermsPage } from "./pages/LegalPages";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { CartPage } from "./pages/CartPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CategoryPage } from "./pages/CategoryPage";
// --- Archivo: src/App.tsx ---
const App = () => {
  return (
    <HelmetProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-gray-100 font-montserrat">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:categorySlug" element={<CategoryPage />} />
                {/* <Route path="/category/all" element={<CategoryPage />} /> Ruta para ver todos los productos */}
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/returns" element={<ReturnsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </HelmetProvider>
  );
};

export default App;
