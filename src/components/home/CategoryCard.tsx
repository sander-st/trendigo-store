import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  category: {
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
  };
  delay?: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group">
      <Link
        to={`/category/${category.slug}`}
        className="block relative overflow-hidden rounded-xl shadow-lg h-80"
        aria-label={`Explorar categoría ${category.name}`}>
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
            <p className="text-gray-200 text-sm">{category.description}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
