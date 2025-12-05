import React, { FC, memo, useCallback, useMemo } from "react";

interface OptionType {
  label: string;
  value: string;
}

interface SelectFieldProps {
  name: string;
  options: string[] | OptionType[];
  value?: string;
  setValue?: (value: string) => void;
  label?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

const SelectField: FC<SelectFieldProps> = memo(
  ({
    name,
    options,
    value = "",
    setValue,
    label,
    className = "",
    placeholder = "Select an option",
    disabled = false,
    required = false,
    error,
  }) => {
    // Stable change handler
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (setValue) setValue(e.target.value);
      },
      [setValue]
    );

    // Class optimization
    const mergedClassName = useMemo(
      () =>
        `
      w-full h-14 rounded-lg border px-4 bg-gray-50 text-gray-900
      ${error ? "border-red-500" : "border-gray-300"}
      focus:outline-none focus:ring-2 focus:ring-gray-200
      disabled:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed
      transition-all duration-200
      ${className}
    `,
      [className, error]
    );

    // Convert simple array into option objects
    const normalizedOptions: OptionType[] = useMemo(
      () =>
        Array.isArray(options)
          ? options.map((opt) =>
              typeof opt === "string" ? { value: opt, label: opt } : opt
            )
          : [],
      [options]
    );

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label htmlFor={name} className="text-sm font-medium text-slate-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <select
          id={name}
          name={name}
          value={value}
          required={required}
          disabled={disabled}
          onChange={handleChange}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={mergedClassName}
        >
          {/* Placeholder option */}
          <option value="" disabled hidden>
            {placeholder}
          </option>

          {normalizedOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-gray-900"
            >
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <span
            id={`${name}-error`}
            className="text-red-500 text-sm font-medium"
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

export default SelectField;
