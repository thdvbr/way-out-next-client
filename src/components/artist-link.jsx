import React from 'react';
import { PortableText } from '@portabletext/react';
import { Content } from './index';

const ArtistLink = ({ artistLink }) => {
  return (
    <div className="xl:text-22.5 xl:leading-7 text-center my-12 tracking-wider">
      <p className="font-secondary font-extrabold sm:text-19 text-12 xl:text-26.5 xl:leading-6">More About the Artist</p>
      <span className="font-agrandir text-12 sm:text-17">
        <Content body={artistLink} />
      </span>
    </div>
  );
};

export default ArtistLink;
