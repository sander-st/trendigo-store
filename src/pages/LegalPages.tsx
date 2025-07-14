import { Helmet } from "react-helmet-async";
// Un componente genérico para mostrar contenido legal
interface LegalPageProps {
  title: string;
  metaDescription: string;
  content: string;
}

export const LegalPage: React.FC<LegalPageProps> = ({ title, metaDescription, content }) => {
  return (
    <>
      <Helmet>
        <title>{title} | Trendigo</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">{title}</h1>
        <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto text-gray-700 leading-relaxed">
          {/* Renderiza el contenido de privacy.md usando ReactMarkdown */}
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
      </div>
    </>
  );
};

export const TermsPage: React.FC = () => (
  <LegalPage
    title="Términos y Condiciones"
    metaDescription="Lee nuestros términos y condiciones de uso de la tienda online."
    content={`
      <p>Bienvenido a nuestra tienda online. Al acceder y utilizar este sitio web, aceptas los presentes Términos y Condiciones. Por favor, léelos detenidamente antes de realizar una compra.</p>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">1. Uso del sitio</h2>
      <p>Este sitio está destinado únicamente para tu uso personal y no comercial. Queda prohibido el uso con fines ilegales o no autorizados.</p>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">2. Productos y precios</h2>
      <p>Los productos mostrados están sujetos a disponibilidad. Nos esforzamos por que las descripciones y precios sean precisos; sin embargo, podrían existir errores tipográficos o variaciones.</p>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">3. Pedidos y pagos</h2>
      <p>Los pedidos pueden gestionarse por nuestra web o vía WhatsApp. Algunos productos permitirán pago contra entrega; otros requerirán pago previo mediante transferencias o plataformas digitales (como Yape, Plin, tarjetas). El detalle se coordinará con cada cliente según el producto y la zona.</p>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">4. Envíos</h2>
      <p>Realizamos envíos a todo el Perú, pudiendo ofrecer envío gratuito en productos seleccionados o por compras superiores a cierto monto. El tiempo de entrega varía según ubicación y disponibilidad.</p>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">5. Cambios y devoluciones</h2>
      <p>Solo aceptamos cambios o devoluciones por productos defectuosos o dañados, previa verificación y dentro de los 7 días posteriores a la recepción del pedido. No aplican devoluciones por cambio de talla o color, salvo error nuestro.</p>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">6. Propiedad intelectual</h2>
      <p>Todo el contenido del sitio web (imágenes, textos, logotipos, diseños) es propiedad de nosotros o de nuestros proveedores. Queda prohibida su reproducción total o parcial sin autorización previa.</p>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">7. Protección de datos</h2>
      <p>Recopilamos datos personales (nombre, dirección, teléfono) únicamente para gestionar tus pedidos y mejorar nuestro servicio. No compartimos tus datos con terceros ajenos a la operación comercial.</p>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">8. Modificaciones</h2>
      <p>Nos reservamos el derecho de actualizar o modificar estos Términos y Condiciones en cualquier momento. Las versiones actualizadas estarán disponibles en esta página.</p>

      <p class="mt-6">Si tienes dudas, puedes contactarnos vía WhatsApp o correo electrónico. Gracias por confiar en nosotros.</p>
    `}
  />
);

export const PrivacyPage: React.FC = () => (
  <LegalPage
    title="Política de Privacidad"
    metaDescription="Conoce cómo protegemos tu privacidad y manejamos tus datos personales en TRENDIGO."
    content={`
      <p><strong>Última actualización:</strong> 13 de Julio de 2025</p>

      <p>En TRENDIGO, valoramos y respetamos tu privacidad. Esta Política de Privacidad describe cómo recopilamos, usamos, compartimos y protegemos tu información personal cuando visitas o realizas compras en nuestro sitio web. Al utilizar nuestros servicios, aceptas las prácticas descritas en esta política.</p>

      <p>Nos comprometemos a cumplir con la <strong>Ley de Protección de Datos Personales de Perú (Ley N° 29733)</strong> y su reglamento.</p>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">1. Información que recopilamos</h2>
      <p>Recopilamos información personal que nos proporcionas directamente, así como datos de uso generados automáticamente.</p>
      <ul>
        <li><strong>Información que nos proporcionas:</strong>
          <ul>
            <li><strong>Datos de Contacto e Identificación:</strong> Nombre completo, dirección de envío, número de teléfono, dirección de correo electrónico.</li>
            <li><strong>Datos de Pedido:</strong> Detalles de los productos que compras, historial de pedidos.</li>
          </ul>
        </li>
        <li><strong>Información recopilada automáticamente:</strong>
          <ul>
            <li><strong>Datos de Uso:</strong> Información sobre cómo interactúas con nuestro sitio web, incluyendo páginas visitadas, tiempo de permanencia, productos vistos, clics, etc.</li>
            <li><strong>Datos Técnicos:</strong> Dirección IP, tipo de navegador, sistema operativo, dispositivo utilizado.</li>
            <li><strong>Cookies y Tecnologías Similares:</strong> Utilizamos cookies y otras tecnologías de seguimiento para mejorar tu experiencia de navegación, analizar el tráfico del sitio y personalizar contenido. Puedes gestionar tus preferencias de cookies a través de la configuración de tu navegador.</li>
          </ul>
        </li>
      </ul>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">2. Finalidad del uso de la información</h2>
      <p>Utilizamos tu información personal para las siguientes finalidades:</p>
      <ul>
        <li><strong>Gestión de Pedidos:</strong> Procesar, confirmar y entregar tus compras.</li>
        <li><strong>Comunicación:</strong> Contactarte para coordinar envíos, responder a tus consultas o proporcionarte actualizaciones sobre tu pedido.</li>
        <li><strong>Mejora del Servicio:</strong> Analizar el uso de nuestro sitio web para mejorar nuestros productos, servicios y la experiencia del usuario.</li>
        <li><strong>Marketing (con tu consentimiento):</strong> Enviarte información sobre ofertas, promociones o novedades de productos, siempre que hayas dado tu consentimiento explícito.</li>
      </ul>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">3. Compartir información</h2>
      <p>Tu privacidad es nuestra prioridad. Solo compartimos tu información personal en las siguientes circunstancias:</p>
      <ul>
        <li><strong>Proveedores de Servicios:</strong> Con terceros que nos asisten en la operación de nuestro negocio, como empresas de mensajería para la entrega de pedidos. Estos proveedores están obligados contractualmente a proteger tu información y usarla únicamente para los fines específicos para los que fueron contratados.</li>
        <li><strong>Cumplimiento Legal:</strong> Cuando sea requerido por ley o por una autoridad competente.</li>
        <li><strong>Protección de Derechos:</strong> Para proteger nuestros derechos, propiedad o seguridad, o los de nuestros usuarios y el público.</li>
      </ul>
      <p>No vendemos, alquilamos ni comercializamos tu información personal con terceros ajenos a nuestra operación comercial.</p>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">4. Seguridad y retención de datos</h2>
      <p>Implementamos medidas de seguridad técnicas y organizativas adecuadas para proteger tu información personal contra el acceso no autorizado, la alteración, divulgación o destrucción.</p>
      <p>Conservaremos tu información personal durante el tiempo necesario para cumplir con las finalidades descritas en esta política, a menos que la ley exija o permita un período de retención más largo.</p>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">5. Tus Derechos (Derechos ARCO)</h2>
      <p>De acuerdo con la Ley de Protección de Datos Personales de Perú, tienes los siguientes derechos sobre tu información personal:</p>
      <ul>
        <li><strong>Derecho de Acceso:</strong> Solicitar una copia de los datos personales que tenemos sobre ti.</li>
        <li><strong>Derecho de Rectificación:</strong> Pedir que corrijamos cualquier información incompleta o inexacta.</li>
        <li><strong>Derecho de Cancelación (Eliminación):</strong> Solicitar la eliminación de tus datos personales cuando ya no sean necesarios para los fines para los que fueron recopilados.</li>
        <li><strong>Derecho de Oposición:</strong> Oponerte al tratamiento de tus datos personales para fines específicos (por ejemplo, marketing directo).</li>
      </ul>
      <p>Para ejercer cualquiera de estos derechos, por favor contáctanos a través de los canales indicados en la sección "Contacto". Atenderemos tu solicitud de acuerdo con la normativa vigente.</p>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">6. Cambios a esta política</h2>
      <p>Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas o en la legislación aplicable. Publicaremos la versión actualizada en esta página con una nueva "Última actualización". Te recomendamos revisar esta política regularmente.</p>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">7. Contacto</h2>
      <p>Si tienes preguntas o inquietudes sobre esta Política de Privacidad o sobre el tratamiento de tus datos personales, no dudes en contactarnos:</p>
      <ul>
        <li><strong>WhatsApp:</strong> [Tu número de WhatsApp]</li>
        <li><strong>Correo Electrónico:</strong> [Tu dirección de correo electrónico]</li>
      </ul>
      <p class="mt-6">Tu confianza es muy importante para nosotros.</p>
    `}
  />
);

export const ReturnsPage: React.FC = () => (
  <LegalPage
    title="Política de Devoluciones y Cambios"
    metaDescription="Conoce nuestra política de devoluciones y cambios en TRENDIGO."
    content={`
      <p><strong>Última actualización:</strong> 13 de Julio de 2025</p>

      <p>En TRENDIGO, queremos que tengas una experiencia segura y satisfactoria. Por eso, contamos con una política de devoluciones y cambios clara y transparente, en cumplimiento con la <strong>Ley del Código de Protección y Defensa del Consumidor (Ley N° 29571)</strong> de Perú.</p>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">1. ¿Cuándo aplica una devolución o cambio?</h2>
      <p>Solo aceptamos <strong>devoluciones</strong> (reembolso del dinero) por productos que presenten **defectos de fabricación** o lleguen **dañados** durante el transporte, previa verificación.</p>
      <p><strong>Importante:</strong> No realizamos cambios ni devoluciones por talla incorrecta, color diferente al esperado o cambios de opinión. Te recomendamos revisar cuidadosamente la guía de tallas y las descripciones de los productos antes de realizar tu compra.</p>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">2. Plazo para solicitar una devolución</h2>
      <p>Debes contactarnos dentro de los <strong>7 días calendario</strong> posteriores a la recepción de tu pedido para reportar un producto defectuoso o dañado. Pasado este plazo, no podremos procesar la solicitud.</p>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">3. Cómo solicitar una devolución</h2>
      <p>Para solicitar una devolución por defecto o daño, comunícate con nosotros por WhatsApp o al correo electrónico, proporcionando la siguiente información:</p>
      <ul>
        <li>Número de pedido.</li>
        <li>Nombre del producto afectado.</li>
        <li>Descripción detallada del defecto o daño.</li>
        <li>Fotografías o videos claros que muestren el defecto o daño.</li>
      </ul>
      <p>Evaluaremos tu caso y te contactaremos en un plazo máximo de 3 días hábiles para confirmar si aplica la devolución y los pasos a seguir.</p>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">4. Reembolso</h2>
      <p>Si tu solicitud de devolución es aprobada, procederemos con el reembolso total del monto pagado por el producto afectado. El reembolso se realizará al mismo método de pago que utilizaste originalmente para la compra. El tiempo de procesamiento del reembolso puede variar según tu banco o plataforma de pago.</p>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">5. Costos de envío asociados a devoluciones</h2>
      <p>Si la devolución es por un producto defectuoso o dañado, **nosotros cubriremos el costo del envío de devolución**. En cualquier otro caso, los costos de envío no son reembolsables.</p>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">6. Productos no retornables</h2>
      <p>Por razones de higiene y salud, y para garantizar la seguridad de todos nuestros clientes, **no aceptamos devoluciones** de ropa interior, trajes de baño, calcetines, o cualquier otro producto de uso íntimo o personal que haya sido abierto o utilizado.</p>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">7. Contacto</h2>
      <p>Si tienes dudas o necesitas ayuda con nuestra política de devoluciones, no dudes en contactarnos:</p>
      <ul>
        <li><strong>WhatsApp:</strong> [Tu número de WhatsApp]</li>
        <li><strong>Correo Electrónico:</strong> [Tu dirección de correo electrónico]</li>
      </ul>
      <p class="mt-6">Estamos aquí para ayudarte a tener la mejor experiencia de compra.</p>
    `}
  />
);
