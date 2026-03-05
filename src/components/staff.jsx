import React from 'react';

export default function Staff({ name, role }) {
  return (
    <>
      <div className="font-copenhagen text-8.5 md:text-10">{role}</div>
      <div className="font-secondary text-14 sm:text-18 md:text-16 xl:text-18">
        {name}
      </div>
    </>
  );
}
