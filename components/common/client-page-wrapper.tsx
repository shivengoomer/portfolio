"use client";

import { ReactNode } from "react";

interface ClientPageWrapperProps {
  children: ReactNode;
}

// Removed framer-motion page transitions to speed up navigation

export const ClientPageWrapper = ({ children }: ClientPageWrapperProps) => {
  return (
    <div className="w-full">
      {children}
    </div>
  );
};
