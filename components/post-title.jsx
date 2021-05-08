import React from 'react';

export default function PostTitle({ children }) {
  return (
    <h1 className="typo-post-title text-center mx-96">
      {children}
    </h1>
  );
}
