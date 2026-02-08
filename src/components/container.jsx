import React from 'react';

export default function Container({ children }) {
  return (
    // w-11/12 = takes up 91.67% of parent width
    <div className="px-3 mx-auto sm:w-11/12 md:container ">{children}</div>
  );
}
