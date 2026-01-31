import React from 'react';

export default function Staff({ name, role }) {
  return (
    <>
      <div className="font-copenhagen text-8.5 sm:text-10 md:text-9 lg:text-10">
        {role}
      </div>
      <div className="font-secondary text-12 sm:text-18 md:text-16 lg:text-18">
        {name}
      </div>
    </>
  );
}
