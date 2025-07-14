import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface TrendSectionProps {
  trends: {
    name: string;
    description: string;
    tag: string;
  }[];
}

export const TrendSection: React.FC<TrendSectionProps> = ({ trends }) => {
  return (
    <section className="py-12 bg-gradient-to-r from-primary to-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Tendencias Actuales</h2>
          <p className="text-white/80 max-w-2xl mx-auto">Descubre las tendencias que están marcando la temporada</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trends.map((trend, index) => (
            <motion.div
              key={trend.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{trend.name}</h3>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {trend.tag}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{trend.description}</p>
              <button className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Ver colección
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
