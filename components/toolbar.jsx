/* eslint-disable import/prefer-default-export */
import React from 'react';
import Link from 'next/link';

export const Toolbar = () => (
  <div className="mx-28 flex justify-between typo-toolbar my-3">
    <div>search</div>
    <div>Stuff We Like</div>
    <div>Interviews</div>
    <div>Radio</div>
    <Link href="/">
      <a>Info</a>
    </Link>
  </div>
);
