import React from 'react';

export default function PostSubtitle({ children }) {
  return (
    <h1 className="block font-subtitle text-20.5 leading-7 sm:text-27.5 sm:leading-8 text-center lg:text-43 xl:text-57 lg:leading-tight mb-9 xl:px-60 px-8 ml:px-48 md:px-44">
      {children}
    </h1>
  );
}
