import React from 'react';

export default function PostTitle({ children }) {
  return (
    <h1 className="block mt-6 leading-7 text-center whitespace-pre-line font-title text-25 sm:text-30 lg:text-42 xl:text-54 lg:leading-10 sm:mt-10 sm:leading-8 ">
      {children}
    </h1>
  );
}
