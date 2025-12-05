import React, { FC, memo, useCallback } from "react";

interface TextAreaFieldProps {
  name: string;
  value?: string;
  setValue?: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string; // allow custom styling
}

const TextAreaField: FC<TextAreaFieldProps> = memo(
  ({ name, value = "", setValue, placeholder, rows = 4, className }) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue?.(e.target.value);
      },
      [setValue]
    );

    return (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        rows={rows}
        placeholder={placeholder}
        aria-label={name}
        className={`w-full p-4 text-sm rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none ${className}`}
      />
    );
  }
);

export default TextAreaField;
