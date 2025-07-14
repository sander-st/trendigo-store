interface InfoMessagesProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const InfoMessages: React.FC<InfoMessagesProps> = ({ icon, title, description }) => {
  return (
    <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
      {icon}
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm">{description}</div>
      </div>
    </div>
  );
};
