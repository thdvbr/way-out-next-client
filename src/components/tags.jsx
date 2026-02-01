import React from 'react';

const Tags = ({ tags = [] }) => {
  return tags.map((tag) => {
    return <div key={tag._key}>{tag}</div>;
  });
};

export default Tags;
