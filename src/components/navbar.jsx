/* eslint-disable import/prefer-default-export */
import React from 'react';
import Link from 'next/link';

const Navbar = () => (
  <div className="flex justify-between font-title text-13.5 sm:text-15 lg:text-17 my-3">
    <div>search</div>
    <div>Stuff We Like</div>
    <div>Interviews</div>
    <div>Radio</div>
    <Link href="/">
      <a>Info</a>
    </Link>
  </div>
);

export default Navbar;
