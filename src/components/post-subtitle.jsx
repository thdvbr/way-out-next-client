import React from 'react';

export default function PostSubtitle({ children }) {
  return (
    <h1 className="whitespace-pre-line block font-subtitle text-24 leading-7 sm:text-27.5 sm:leading-7 text-center lg:text-40 xl:text-54 lg:leading-10 mb-9">
      {children}
    </h1>
  );
}
