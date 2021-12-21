import React from 'react';

export default function PostTitle({ children }) {
  return (
    <h1 className="font-title text-22.5 leading-8 sm:text-30 lg:text-42 xl:text-55.5 lg:leading-tight text-center mt-6 sm:leading-9 px-12 md:px-36 ml:px-56 lg:px-72 xl:px-80">
      {children}
    </h1>
  );
}
