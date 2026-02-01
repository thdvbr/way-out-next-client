import React from 'react';

export default function Container({ children }) {
  return (
    <div className="px-3 mx-auto xl:container md:px-8 ml:px-40 ">
      {children}
    </div>
  );
}
