import React from 'react';

export default function ThemeWrapper({ children, theme = 'light' }) {
  return (
    <div
      className={` ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {children}
    </div>
  );
}
