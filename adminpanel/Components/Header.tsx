"use client";

import React, { FC, ReactNode, memo, useMemo } from "react";

interface HeaderProps {
  headerTitle?: string;
  headerDescription?: string;
  actions?: ReactNode; // 👈 accepts one or multiple buttons
  className?: string;  // optional extra styling
}

const Header: FC<HeaderProps> = memo(
  ({ headerTitle = "", headerDescription = "", actions, className = "" }) => {
    // Memoize the left-side content
    const leftContent = useMemo(() => {
      if (!headerTitle && !headerDescription) return null;

      return (
        <div className="flex flex-col">
          {headerTitle && (
            <h1 className="text-2xl sm:text-4xl font-black text-gray-800">
              {headerTitle}
            </h1>
          )}
          {headerDescription && (
            <p className="text-gray-500 text-sm sm:text-base">
              {headerDescription}
            </p>
          )}
        </div>
      );
    }, [headerTitle, headerDescription]);

    // Memoize actions to prevent unnecessary re-renders
    const actionContent = useMemo(() => {
      if (!actions) return null;
      return <div className="flex flex-wrap gap-2 cursor-pointer">{actions}</div>;
    }, [actions]);

    return (
      <header
        className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 w-full ${className}`}
      >
        {leftContent}
        {actionContent}
      </header>
    );
  }
);

Header.displayName = "Header";

export default Header;
