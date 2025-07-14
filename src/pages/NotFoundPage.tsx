import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "../components/common/Button";

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Página No Encontrada | Mi Tienda Fitness</title>
        <meta name="description" content="La página que buscas no existe." />
      </Helmet>
      <div className="container mx-auto px-4 py-12 text-center h-screen flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <p className="text-3xl font-semibold text-gray-800 mb-6">Página No Encontrada</p>
        <p className="text-gray-600 mb-8">Lo sentimos, no pudimos encontrar la página que buscas.</p>
        <Link to="/">
          <Button>Volver a la Página Principal</Button>
        </Link>
      </div>
    </>
  );
};
