import React from 'react';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from '../utils/sanity.server';

const SideAdImage = ({ image, url }) => {
  if (!image) return null;
  const urlFor = (source) => {
    return imageUrlBuilder(sanityClient).image(source);
  };

  return (
    <div className="sticky top-1/3">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Image
          src={urlFor(image).width(110).url()}
          alt={image.alt || 'Advertisement'}
          width={110}
          height={110} // you can adjust this or calculate aspect ratio dynamically
          className="sm:w-16 md:w-20 ml:w-24 lg:w-28 xl:w-30"
        />
      </a>
    </div>
  );
};

export default SideAdImage;
