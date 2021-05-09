import React from 'react';
import BlockContent from '@sanity/block-content-to-react';

const ArtistLink = ({ artistLink }) => {
  return (
    <div className="typo-post-artist-link text-center my-12 tracking-wider">
      <p className="typo-post-question">More About the Artist</p>
      <br />
      <BlockContent blocks={artistLink} />
    </div>
  );
};

export default ArtistLink;
