import React from 'react';

export default function Staff({ name, role }) {
  return (
    <>
      <div className="font-copenhagen text-8.5 sm:text-9 leading-none">{role}</div>
      <div className="font-secondary text-14 sm:text-18 leading-5 sm:leading-7">{name}</div>
    </>
  );
}
