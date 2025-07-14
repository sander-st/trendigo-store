import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";
import { Input } from "../components/common/Input";
import { Textarea } from "../components/common/Textarea";
import { Button } from "../components/common/Button";

// 1. Definición de esquema y tipos
const CONTACT_REASONS = [
  { value: "pedido", label: "Consulta sobre un pedido" },
  { value: "producto", label: "Pregunta sobre un producto" },
  { value: "otro", label: "Otro" },
] as const;

const contactSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().email("Correo inválido"),
  phone: z.string().min(5, "El teléfono es obligatorio"),
  reason: z.enum([CONTACT_REASONS[0].value, ...CONTACT_REASONS.slice(1).map((r) => r.value)]),
  message: z.string().min(10, "El mensaje es obligatorio"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// 3. Componente para ítems de contacto reutilizable
const ContactInfoItem = ({ label, href }: { label: string; href: string }) => (
  <p className="text-gray-700 dark:text-gray-300">
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-link text-secondary hover:text-green-500 ml-1">
      {label}
    </a>
  </p>
);

// 4. Componente de formulario independiente
const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // En una aplicación real aquí iría la API call
    console.log("Formulario enviado:", data);
    alert("Gracias por tu mensaje. Te responderemos pronto.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input id="name" label="Tu Nombre" placeholder="Tu nombre" {...register("name")} error={errors.name?.message} />

      <Input
        id="email"
        type="email"
        label="Correo Electrónico"
        placeholder="tu@correo.com"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input id="phone" label="Teléfono" placeholder="+51..." {...register("phone")} error={errors.phone?.message} />

      <div>
        <label htmlFor="reason" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
          Motivo de contacto
        </label>
        <select
          id="reason"
          {...register("reason")}
          className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-800 dark:text-gray-100">
          <option value="">Selecciona un motivo</option>
          {CONTACT_REASONS.map((reason) => (
            <option key={reason.value} value={reason.value}>
              {reason.label}
            </option>
          ))}
        </select>
        {errors.reason?.message && <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>}
      </div>

      <Textarea
        id="message"
        label="Mensaje"
        placeholder="Escribe tu mensaje..."
        {...register("message")}
        error={errors.message?.message}
        rows={5}
      />

      <Button
        type="submit"
        className="w-full btn-primary"
        disabled={isSubmitting}
        // loading={isSubmitting}
      >
        Enviar Mensaje
      </Button>
    </form>
  );
};

// 5. Componente principal refactorizado
export const ContactPage: React.FC = () => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_BUSINESS_PHONE;

  return (
    <>
      <Helmet>
        <title>Contáctanos | TRENDIGO</title>
        <meta name="description" content="Ponte en contacto con nosotros para consultas, pedidos o soporte." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">📩 Contáctanos</h1>

        <p className="text-center text-gray-700 dark:text-gray-200 mb-8 max-w-2xl mx-auto">
          Estaremos encantados de ayudarte a resolver cualquier duda o consulta sobre nuestros productos o pedidos.
          Responderemos lo antes posible, incluso fuera de horario cuando sea posible.
        </p>

        <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow-md p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Envíanos un Mensaje</h2>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM (GMT-5). También respondemos fuera de horario
            cuando sea posible.
          </p>
          <ContactForm />
          <ContactInfoItem
            label="Cóntactanos por WhatsApp"
            href={`https://wa.me/${whatsappNumber}?text=Hola Trendigo.`}
          />
        </div>
      </div>
    </>
  );
};
