import React from 'react';

export default function Container({ children }) {
  return <div className="xl:container px-2 sm:px-6 md:px-12 ml:px-14 lg:px-16 mx-auto">{children}</div>;
}
