import React from 'react';

export default function Container({ children }) {
  return <div className="xl:container px-3 md:px-8 ml:px-40 mx-auto">{children}</div>;
}
