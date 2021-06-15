import React from 'react';

export default function PostTitle({ children }) {
  return (
    <h1 className="font-title text-30 text-center mx-4 mt-6 leading-9">
      {children}
    </h1>
  );
}
