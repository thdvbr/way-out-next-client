import React from 'react';

export default function PostSubtitle({ children }) {
  return (
    <h1 className="font-subtitle text-27.5 text-center lg:text-43 xl:text-57 lg:leading-normal mb-9 mx-4 leading-8">
      {children}
    </h1>
  );
}
