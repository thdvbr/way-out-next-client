import React from 'react';

export default function PostTitle({ children }) {
  return (
    <h1 className="font-title text-22.5 leading-8 sm:text-30 lg:text-42 xl:text-55.5 lg:leading-normal text-center mx-4 mt-6 sm:leading-9 xl:px-64 lg:px-80">
      {children}
    </h1>
  );
}
