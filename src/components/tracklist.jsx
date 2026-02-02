import React from 'react';

const Tracklist = ({ tracklist = [] }) => {
  return tracklist.map((track, index) => (
    <div key={track._key || index}>
      <div className="mt-2 font-main text-18">{track.artist}</div>
      <div className="mt-1 mb-4 font-secondary text-15">{track.title}</div>
    </div>
  ));
};

export default Tracklist;
