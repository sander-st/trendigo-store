import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { customerSchema, type CustomerFormData } from "../../types/customer";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { Textarea } from "../common/Textarea";

interface CustomerFormProps {
  onSubmit: (data: CustomerFormData) => void;
  isLoading?: boolean;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit, isLoading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Datos del Cliente</h2>

      <Input
        id="fullName"
        label="Nombre Completo"
        placeholder="Ej: Juan Pérez"
        {...register("fullName")}
        error={errors.fullName?.message}
      />
      <Input
        id="phoneNumber"
        label="Número de Teléfono (ej. +51 987654321)"
        placeholder="+51 987654321"
        {...register("phoneNumber")}
        error={errors.phoneNumber?.message}
      />
      <Input
        id="email"
        label="Correo Electrónico (Opcional)"
        type="email"
        placeholder="ejemplo@dominio.com"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        id="country"
        label="País"
        defaultValue="Perú"
        placeholder="Perú"
        disabled
        {...register("country")}
        error={errors.country?.message}
      />
      <Input
        id="region"
        label="Región/Departamento"
        placeholder="Ej: Lima"
        {...register("region")}
        error={errors.region?.message}
      />
      <Input
        id="province"
        label="Provincia"
        placeholder="Ej: Lima"
        {...register("province")}
        error={errors.province?.message}
      />
      <Input
        id="district"
        label="Distrito/Ciudad"
        placeholder="Ej: Miraflores"
        {...register("district")}
        error={errors.district?.message}
      />
      <Textarea
        id="shippingAddress"
        label="Dirección de Envío Completa (Calle, número, referencias)"
        placeholder="Ej: Av. Principal 123, Dpto. 401, Ref: Frente al parque"
        {...register("shippingAddress")}
        error={errors.shippingAddress?.message}
      />
      <Textarea
        id="additionalNotes"
        label="Notas Adicionales (Opcional)"
        placeholder="Ej: Entregar por las tardes, dejar en portería."
        {...register("additionalNotes")}
      />

      <Button type="submit" className="w-full mt-6 btn-success" disabled={isLoading}>
        {isLoading ? "Enviando Pedido..." : "Enviar Pedido por WhatsApp"}
      </Button>
    </form>
  );
};
