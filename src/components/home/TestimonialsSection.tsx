import { motion } from "framer-motion";
import { Star } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "María López",
      comment: "La calidad de las prendas superó mis expectativas. ¡Volveré a comprar!",
      rating: 5,
      location: "Lima, Perú",
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      comment: "Rápido envío y atención al cliente excelente. Recomendado 100%.",
      rating: 5,
      location: "Arequipa, Perú",
    },
    {
      id: 3,
      name: "Ana Martínez",
      comment: "Encontré justo lo que buscaba para mis hijos. Calidad increíble.",
      rating: 4,
      location: "Trujillo, Perú",
    },
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">Lo Que Dicen Nuestros Clientes</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Más de 5,000 clientes satisfechos en todo el Perú
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">"{testimonial.comment}"</p>
              <div className="flex items-center">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <h4 className="font-bold text-gray-800 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
