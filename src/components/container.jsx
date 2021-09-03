import React from 'react';

export default function Container({ children }) {
  return <div className="container mx-auto xl:px-20 px-4 sm:px-6">{children}</div>;
}
