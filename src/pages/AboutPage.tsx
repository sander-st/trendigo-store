import { Helmet } from "react-helmet-async";

export const AboutPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Acerca de Nosotros | Mi Tienda Fitness</title>
        <meta name="description" content="Conoce más sobre Mi Tienda Fitness, nuestra misión y visión." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Acerca de Mi Tienda Fitness</h1>
        <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto text-gray-700 leading-relaxed">
          <p className="mb-4">
            En **Mi Tienda Fitness**, nuestra misión es empoderar a las personas para que alcancen sus metas de salud y
            bienestar, ofreciendo equipos de ejercicio de alta calidad y accesorios innovadores. Creemos que el
            ejercicio debe ser accesible, efectivo y disfrutable para todos, sin importar su nivel de experiencia.
          </p>
          <p className="mb-4">
            Nos dedicamos a seleccionar cuidadosamente los productos más avanzados y en tendencia del mercado, desde
            cintas de correr inteligentes y bicicletas de spinning de alta tecnología, hasta pesas ajustables y bandas
            de resistencia versátiles. Cada artículo en nuestro catálogo está diseñado para optimizar tu rutina de
            entrenamiento y ayudarte a mantenerte activo desde la comodidad de tu hogar.
          </p>
          <p className="mb-4">
            Más allá de los productos, nos esforzamos por construir una comunidad y ofrecer un servicio al cliente
            excepcional. Estamos comprometidos con tu satisfacción y te acompañamos en cada paso de tu viaje fitness.
          </p>
          <p>Gracias por elegir Mi Tienda Fitness. ¡Juntos, alcancemos nuevas metas!</p>
        </div>
      </div>
    </>
  );
};
