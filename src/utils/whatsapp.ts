import type { CartItem } from "../types/cart";
import type { CustomerFormData } from "../types/customer";

// Función para validar y formatear el número de WhatsApp
const formatWhatsAppNumber = (phone: string): string => {
  // Eliminar todo excepto dígitos y el signo +
  const cleaned = phone.replace(/[^\d+]/g, "");

  // Si no tiene prefijo internacional, agregar el de Perú
  if (!cleaned.startsWith("+") && cleaned.startsWith("51")) {
    return `+${cleaned}`;
  }

  // Asegurar que tenga el formato internacional completo
  return cleaned.startsWith("+") ? cleaned : `+51${cleaned}`;
};

export const buildWhatsAppLink = (
  customerData: CustomerFormData,
  cartItems: CartItem[],
  totalAmount: number
): string => {
  // Obtener y validar número de WhatsApp
  let whatsappPhone = import.meta.env.VITE_WHATSAPP_BUSINESS_PHONE || "+51987654321";
  whatsappPhone = formatWhatsAppNumber(whatsappPhone);

  // Validación básica de datos del cliente
  if (!customerData.fullName || !customerData.phoneNumber) {
    console.error("Customer data is incomplete");
    return "#";
  }

  // Construir secciones del mensaje
  const sections = [];

  // 1. Encabezado
  sections.push("¡Hola! 👋 Tengo un nuevo pedido de TRENDIGO.");
  sections.push("");

  // 2. Información del cliente
  sections.push("💁 *DATOS DEL CLIENTE*");
  sections.push(`• Nombre: ${customerData.fullName}`);
  sections.push(`• Teléfono: ${customerData.phoneNumber}`);

  if (customerData.email) {
    sections.push(`• Correo: ${customerData.email}`);
  }

  sections.push(`• País: ${customerData.country}`);
  sections.push(`• Región: ${customerData.region}`);
  sections.push(`• Provincia: ${customerData.province}`);
  sections.push(`• Distrito: ${customerData.district}`);
  sections.push(`• Dirección: ${customerData.shippingAddress}`);

  if (customerData.additionalNotes) {
    sections.push(`• Notas: ${customerData.additionalNotes}`);
  }

  // 3. Detalle del pedido
  sections.push("");
  sections.push("🛍️ *DETALLE DEL PEDIDO*");

  cartItems.forEach((item) => {
    const itemSubtotal = item.price * item.quantity;
    sections.push(
      `➤ ${item.name}`,
      `  - Color: ${item.color}`,
      `  - Talla: ${item.size}`,
      `  - Cantidad: ${item.quantity}`,
      `  - Precio: S/ ${item.price.toFixed(2)}`,
      `  - Subtotal: S/ ${itemSubtotal.toFixed(2)}`,
      ""
    );
  });

  // 4. Resumen del pedido
  sections.push("");
  sections.push("💰 *RESUMEN DEL PEDIDO*");
  sections.push(`• Subtotal: S/ ${totalAmount.toFixed(2)}`);

  // Calcular ahorros (si hay descuentos)
  const totalSavings = cartItems.reduce((acc, item) => {
    if (item.regularPrice > item.price) {
      return acc + (item.regularPrice - item.price) * item.quantity;
    }
    return acc;
  }, 0);

  if (totalSavings > 0) {
    sections.push(`• Ahorros: S/ ${totalSavings.toFixed(2)}`);
  }

  sections.push(`• Total: S/ ${totalAmount.toFixed(2)}`);
  sections.push("");

  // 5. Mensaje de cierre
  sections.push("📦 ¡Por favor, coordina el envío conmigo! Gracias. 🙏");

  // Construir mensaje final
  const message = sections.join("\n");

  // Codificar para URL (preservando saltos de línea)
  const encodedMessage = encodeURIComponent(message)
    .replace(/%0A/g, "%0D%0A") // Mantener saltos de línea en WhatsApp
    .replace(/%2B/g, "%20"); // Reemplazar '+' por espacio

  // Crear enlace de WhatsApp con prefijo universal
  return `https://wa.me/${whatsappPhone}?text=${encodedMessage}`;
};
