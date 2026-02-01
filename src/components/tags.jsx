import React from 'react';

const Tags = ({ tags = [] }) => {
  return (
    <div className="flex flex-row gap-2">
      {tags.map((tag) => (
        <div
          className="px-2 py-0 border border-white font-secondary"
          key={tag._key}>
          {tag}
        </div>
      ))}
    </div>
  );
};

export default Tags;
