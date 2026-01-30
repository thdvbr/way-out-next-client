import React from 'react';
import Image from "next/image";
import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from '../utils/sanity.server';

const SideAdImage = ({ image, url }) => {
  const urlFor = (source) => {
    return imageUrlBuilder(sanityClient).image(source);
  };

  const adImage = image && <img className="sm:w-16 md:w-20 ml:w-24 lg:w-28 xl:w-30" src={urlFor(image).width(110).url()} />;
  return (
    <div className="sticky top-1/3">
      <td className="font-secondary text-9 md:text-10 ml:text-12 xl:text-14 text-right block mb-1">Sponsored by:</td>
      <a href={url}>{adImage}</a>
    </div>
  );
};

export default SideAdImage;
