import React from 'react';

const Tracklist = ({ tracklist = [] }) => {
  return tracklist.map((track) => (
    <>
      <div className="font-main" key={track._key}>
        {track.artist}
      </div>
      <div className="font-secondary" key={track._key}>
        {track.title}
      </div>
    </>
  ));
};

export default Tracklist;
