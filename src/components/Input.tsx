import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { LucideIcon, Eye, EyeClosed } from 'lucide-react';
import { Input as InputUI } from './ui/input';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: LucideIcon;
  label?: string;
}

export const Input = ({
  name,
  label,
  icon: Icon,
  placeholder,
  type,
  ...props
}: InputProps) => {
  const { control } = useFormContext();

  const isPasswordInput = type === 'password';
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPasswordInput ? (showPassword ? 'text' : 'password') : type;

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const PasswordToggleIcon = showPassword ? Eye : EyeClosed;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col w-full">

          {label && (
            <label htmlFor={name} className="mb-1 text-sm font-medium text-slate-700">
              {label}
            </label>
          )}

          <div className="relative flex items-center">

            {Icon && (
              <div className="absolute left-3 text-slate-400 pointer-events-none">
                <Icon className="h-4 w-4" />
              </div>
            )}

            <InputUI
              {...field}
              id={name}
              type={inputType}
              placeholder={placeholder}
              className={`text-slate-700 border border-slate-300 ${Icon ? 'pl-10' : 'pl-3'} ${isPasswordInput ? 'pr-10' : 'pr-3'} ${error ? 'border-red-600' : ''}`}
              {...props}
            />

            {isPasswordInput && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
              >
                <PasswordToggleIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          {error && (
            <p className="mt-1 text-xs text-red-600 pl-1" role="alert">
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};