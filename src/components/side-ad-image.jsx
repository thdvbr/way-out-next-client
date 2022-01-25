import React from 'react';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from '../utils/sanity.server';

const SideAdImage = ({ image, url }) => {
  // const { adsData } = useAppContext();
  // const sideAds = adsData.filter(ad => ad.adCategory === "Side");
  // console.log(sideAds);
  // const { adImage } = adsData[0];

  const urlFor = (source) => {
    return imageUrlBuilder(sanityClient).image(source);
  };

  const adImage = image && <img src={urlFor(image).width(80).url()} />;
  return (
    <div className="sticky top-1/3">
      <a href={url}>{adImage}</a>
    </div>
  );
};

export default SideAdImage;
