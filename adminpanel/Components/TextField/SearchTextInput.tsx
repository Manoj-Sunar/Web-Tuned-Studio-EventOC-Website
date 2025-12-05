import React, { FC, memo, useMemo } from "react";
import InputTextField from "./InputTextField";
import { Search } from "lucide-react";

interface SearchTextInputProps {
  placeholder?: string;
  name: string;
  value?: string;
  type?: string;
  setValue?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  error?: string;
}

const SearchTextInput: FC<SearchTextInputProps> = memo(
  ({
    placeholder = "Search...",
    name,
    value = "",
    type = "text",
    setValue,
    className = "",
    disabled = false,
    error,
  }) => {
    // Memoized wrapper classes
    const wrapperClasses = useMemo(
      () =>
        `
      flex items-center border bg-white rounded-lg 
      border-gray-200 pl-3 mb-4
      focus-within:ring-2 focus-within:ring-gray-200
      disabled:bg-gray-100 disabled:opacity-60
      transition-all duration-200
      ${className}
    `,
      [className]
    );

    return (
      <div className={wrapperClasses} role="search" aria-label="Search input">
        <Search
          className="p-1 mr-2 text-gray-700"
          size={26}
          aria-hidden="true"
        />

        <InputTextField
          placeholder={placeholder}
          name={name}
          InputValue={value}
          setValue={setValue}
          type={type}
          disabled={disabled}
          error={error}
          className="bg-white border-0 focus:ring-0 rounded-none"
        />
      </div>
    );
  }
);

export default SearchTextInput;
