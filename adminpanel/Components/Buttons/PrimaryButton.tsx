import React, { FC, memo, useCallback, useMemo } from "react";

interface PrimaryButtonProps {
    type?: "button" | "submit" | "reset";
    label?:any|string;
    className?: string;
    onClick?: () => void;
    loading?: boolean;
    disabled?: boolean;
}

const PrimaryButton: FC<PrimaryButtonProps> = memo(
    ({
        type = "button",
        label = "Submit",
        className = "",
        onClick,
        loading = false,
        disabled = false,
    }) => {
        // Prevent re-creation of click handler
        const handleClick = useCallback(() => {
            if (!loading && onClick) onClick();
        }, [loading, onClick]);

        // Prevent recalculation of merged classes
        const mergedClassName = useMemo(
            () =>
                `w-full rounded-lg bg-[#137fec] cursor-pointer text-white font-semibold shadow-md
         hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2
         transition-all duration-200 flex items-center justify-center
         ${disabled || loading ? "opacity-60 cursor-not-allowed" : ""}
         ${className}`,
            [className, disabled, loading]
        );

        return (
            <button
                type={type}
                onClick={handleClick}
                disabled={disabled || loading}
                aria-label={label}
                className={mergedClassName}
            >
                {loading ? "Please wait..." : label}
            </button>
        );
    }
);

export default PrimaryButton;
