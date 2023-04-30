import React from 'react';
import { PortableText } from '@portabletext/react';
import { Content } from './index';

const ArtistLink = ({ artistLink }) => {
  return (
    <div className="xl:text-22.5 xl:leading-7 text-center my-12 tracking-wider">
      <p className="font-secondary font-extrabold text-16 ml:text-20 xl:text-26.5 xl:leading-8">More About the Artist</p>
      <span className="font-agrandir text-14 ml:text-18 xl:text-24 xl:leading-8">
        <Content body={artistLink} />
      </span>
    </div>
  );
};

export default ArtistLink;
