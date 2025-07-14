import { Truck, ShieldCheck, Gift } from "lucide-react";
import { InfoMessages } from "../moleculs/InfoMessages";

const iconClass = "w-6 h-6 text-blue-600";

const trusteds = [
  {
    icon: Truck,
    title: "Entrega rápida",
    description: "24-48h en Lima Metropolitana",
  },
  {
    icon: ShieldCheck,
    title: "Compra segura",
    description: "Protegemos tus datos",
  },
  {
    icon: Gift,
    title: "Regalo sorpresa",
    description: "En pedidos +S/150",
  },
];

export const TrustedMessages = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {trusteds.map((trusted) => (
        <InfoMessages
          key={trusted.title + trusted.description}
          icon={<trusted.icon className={iconClass} />}
          title={trusted.title}
          description={trusted.description}
        />
      ))}
    </div>
  );
};
