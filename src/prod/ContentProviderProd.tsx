import React from 'react';

// Production No-Op Provider: Passes children through with zero state or performance overhead
export const ContentProviderProd: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
