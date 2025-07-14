interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  id: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, id, error, className = "", ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error ? "border-red-500" : "border-gray-300 dark:border-gray-700"
        } ${className}`}
        rows={4}
        {...props}
      />
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};
