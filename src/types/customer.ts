import { z } from "zod";

export const customerSchema = z.object({
  fullName: z.string().min(1, "El nombre completo es requerido."),
  phoneNumber: z.string().regex(/^\+\d{1,3}\s?\d{6,14}$/, "Formato de teléfono inválido (ej. +51 987654321)."),
  email: z.string().email("Formato de correo electrónico inválido.").optional().or(z.literal("")),
  country: z.string().min(1, "El país es requerido."),
  region: z.string().min(1, "La región/departamento es requerida."),
  province: z.string().min(1, "La provincia es requerida."),
  district: z.string().min(1, "El distrito/ciudad es requerido."),
  shippingAddress: z.string().min(1, "La dirección de envío es requerida."),
  additionalNotes: z.string().optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
