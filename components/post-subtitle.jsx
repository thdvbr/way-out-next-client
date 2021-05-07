import React from 'react';

export default function PostSubtitle({ children }) {
  return (
    <h1 className="text-6xl md:text-7xl lg:text-8xl font-subtitle tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
      {children}
    </h1>
  );
}
