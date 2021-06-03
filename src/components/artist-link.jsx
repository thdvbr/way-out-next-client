import React from 'react';
import BlockContent from '@sanity/block-content-to-react';

const ArtistLink = ({ artistLink }) => {
  return (
    <div className="font-agrandir text-center my-12 tracking-wider">
      <p className="font-secondary text-17 font-bold">More About the Artist</p>
      <br />
      <BlockContent blocks={artistLink} />
    </div>
  );
};

export default ArtistLink;
