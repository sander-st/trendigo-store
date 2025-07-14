import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface BannerPromoProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
}

export const BannerPromo: React.FC<BannerPromoProps> = ({
  title,
  subtitle,
  ctaText = "Descubrir más",
  ctaLink = "/",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative bg-gradient-to-r from-primary to-secondary text-white py-12 px-4 mb-8">
      <div className="container mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold mb-3 drop-shadow">
          {title}
        </motion.h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6 opacity-90">{subtitle}</p>
        {ctaText && (
          <Link to={ctaLink} className="btn btn-primary relative z-10 inline-flex items-center mt-2 shadow-lg">
            {ctaText}
            <ArrowRight />
          </Link>
        )}
      </div>

      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full"></div>
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-white rounded-full"></div>
      </div>
    </motion.div>
  );
};
