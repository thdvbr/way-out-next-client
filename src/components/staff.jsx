import React from 'react';

export default function Staff({ name, role }) {
  return (
    <>
      <div className="font-copenhagen text-9 leading-none">{role}</div>
      <div className="font-secondary text-18 leading-7">{name}</div>
    </>
  );
}
