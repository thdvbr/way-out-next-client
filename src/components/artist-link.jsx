import React from 'react';
import BlockContent from '@sanity/block-content-to-react';

const ArtistLink = ({ artistLink }) => {
  return (
    <div className="font-agrandir xl:text-22.5 xl:leading-7 text-center my-12 tracking-wider">
      <p className="underline sm:text-19 text-17 xl:text-26.5 xl:leading-6">More About the Artist</p>
      <BlockContent blocks={artistLink} />
    </div>
  );
};

export default ArtistLink;
