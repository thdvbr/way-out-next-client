import React from 'react';

export default function PostTitle({ children }) {
  return (
    <h1 className="font-title text-30 lg:text-42 xl:text-55.5 lg:leading-normal text-center mx-4 mt-6 leading-9">
      {children}
    </h1>
  );
}
