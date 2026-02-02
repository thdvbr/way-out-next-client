import React from 'react';

const Tracklist = ({ tracklist = [] }) => {
  return tracklist.map((track, index) => (
    <div key={track._key || index}>
      <div className="mt-2 font-main">{track.artist}</div>
      <div className="mb-2 -mt-0.5 font-secondary text-13">{track.title}</div>
    </div>
  ));
};

export default Tracklist;
