import React, { FC, memo, useCallback, useMemo } from "react";
import ServerMsg from "../ServerMsg";

interface InputTextFieldProps {
    type?: string;
    name: string;
    InputValue?: string;
    setValue?: (value: string) => void;
    placeholder?: string;
    className?: string;
    label?: string;
    error: string|null;
    required?: boolean;
    disabled?: boolean;
}

const InputTextField: FC<InputTextFieldProps> = memo(
    ({
        type = "text",
        name,
        InputValue = "",
        setValue,
        placeholder = "",
        className = "",
        label,
        error,
        required = false,
        disabled = false,
    }) => {
        // Prevent re-creation of onChange handler
        const handleChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                if (setValue) setValue(e.target.value);
            },
            [setValue]
        );

        // Memoized final classes
        const mergedClassName = useMemo(
            () =>
                `
      w-full h-12 pl-4 pr-4 rounded-lg border 
      ${error ? "border-red-500" : "border-gray-200"} 
      bg-gray-50 text-slate-900 placeholder:text-slate-400 
      focus:ring-2 text-sm focus:ring-gray-100 outline-none
      disabled:opacity-50 disabled:cursor-not-allowed
      transition-all duration-200
      ${className}
    `,
            [className, error]
        );

        return (
            <div className="flex flex-col gap-1 w-full">
                {label && (
                    <label
                        htmlFor={name}
                        className="text-sm font-medium text-slate-700"
                    >
                        {label} {required && <span className="text-red-500">*</span>}
                    </label>
                )}

                <input
                    id={name}
                    type={type}
                    name={name}
                    value={InputValue}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? `${name}-error` : undefined}
                    className={mergedClassName}
                    required={required}
                />

                {error && (
                    <ServerMsg errorMsg={error} />
                )}
            </div>
        );
    }
);

export default InputTextField;
