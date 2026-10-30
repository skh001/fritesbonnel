import type { InputHTMLAttributes, ReactNode } from 'react';

// Même style de champ que le formulaire de devis (page Événements)
export const INPUT_CLASS =
  'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-shadow';
export const INPUT_ERROR_CLASS = 'border-red-500 bg-red-50/50';

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
}

export const FormField = ({ id, label, required, error, hint, children }: FormFieldProps) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-600"> *</span>}
    </label>
    {children}
    {error ? (
      <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
        {error}
      </p>
    ) : (
      hint && <p className="mt-1.5 text-xs text-gray-500">{hint}</p>
    )}
  </div>
);

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  error?: string;
}

export const TextInput = ({ id, error, className = '', ...props }: TextInputProps) => (
  <input
    id={id}
    name={id}
    aria-invalid={Boolean(error)}
    aria-describedby={error ? `${id}-error` : undefined}
    className={`${INPUT_CLASS} ${error ? INPUT_ERROR_CLASS : ''} ${className}`}
    {...props}
  />
);
