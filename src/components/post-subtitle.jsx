import React from 'react';

export default function PostSubtitle({ children }) {
  return (
    <h1 className="block font-subtitle text-22 leading-6 sm:text-27.5 sm:leading-7 text-center lg:text-40 xl:text-54 lg:leading-10 mb-9 xl:px-60 px-8 ml:px-[20rem] md:px-44">
      {children}
    </h1>
  );
}
