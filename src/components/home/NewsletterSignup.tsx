import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export const NewsletterSignup: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-primary to-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block bg-white/20 p-3 rounded-full mb-6">
            <Mail className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-3xl font-bold text-white mb-3">Suscríbete a Nuestro Newsletter</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Recibe las últimas tendencias, ofertas exclusivas y novedades antes que nadie
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="btn btn-light px-6 py-3 font-bold">Suscribirme</button>
          </div>

          <p className="text-white/60 text-sm mt-4">
            Prometemos no enviarte spam. Puedes cancelar tu suscripción en cualquier momento.
          </p>
        </div>
      </div>
    </section>
  );
};
