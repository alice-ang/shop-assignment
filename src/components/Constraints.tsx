import React, { ReactNode } from "react";

export const Constraints = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto max-w-screen-2xl h-full p-2 md:p-4  w-full">
      {children}
    </div>
  );
};
