import React from 'react';
import Logo from './logo-svg';

// hyperlink for donate? and join goes to..?

export default function Header() {
  return (
    <header className="flex relative flex-wrap justify-between pt-5 mb-10 font-main xl:text-22.5 lg:text-17 md:text-17">
      <span>Donate</span>
      <Logo />
      <span>Join</span>
    </header>
  );
}
