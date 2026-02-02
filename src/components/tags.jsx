import React from 'react';

const Tags = ({ tags = [] }) => {
  return (
    <div className="flex flex-row gap-2">
      {tags.map((tag, index) => (
        <div
          className="px-2 py-0 border border-white font-secondary text-17 xl:text-22"
          // eslint-disable-next-line react/jsx-closing-bracket-location
          key={tag._key || `${tag}-${index}`}>
          {tag}
        </div>
      ))}
    </div>
  );
};

export default Tags;
