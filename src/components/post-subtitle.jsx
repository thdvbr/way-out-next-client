import React from 'react';

export default function PostSubtitle({ children }) {
  return (
    <h1 className="font-subtitle text-20.5 leading-7 sm:text-27.5 sm:leading-8 text-center lg:text-43 xl:text-57 lg:leading-tight mb-9 mx-4 xl:px-60 lg:px-72">
      {children}
    </h1>
  );
}
