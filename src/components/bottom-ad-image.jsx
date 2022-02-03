import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from '../utils/sanity.server';

const BottomAdImage = ({ image, url }) => {
  const urlFor = (source) => {
    return imageUrlBuilder(sanityClient).image(source);
  };

  const adImage = image && <img src={urlFor(image).width(1700).url()} />;
  return (
    <motion.div
      className="sticky top-1/3"
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}>
      <a href={url}>{adImage}</a>
    </motion.div>
  );
};

export default BottomAdImage;
