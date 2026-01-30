import React from 'react';
import Image from "next/image";
import { useNextSanityImage } from 'next-sanity-image';
import { motion } from 'framer-motion';
import { sanityClient } from '../utils/sanity.server';

const BottomAdImage = ({ image: source, url }) => {
  const myCustomImageBuilder = (imageUrlBuilder) => {
    return imageUrlBuilder.width(1500);
  };

  const imageProps = useNextSanityImage(sanityClient, source, {
    blurUpImageWidth: 124,
    blurUpImageQuality: 40,
    blurUpAmount: 200,
    imageBuilder: myCustomImageBuilder,
  });

  const image = source ? (
    <Image
      src={imageProps.src}
      loader={imageProps.loader}
      alt='Bottom ad image'
      fill
      sizes="(min-width: 500px), 800px auto"
      style={{
        objectFit: "cover"
      }} />
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  );

  return (
    <motion.div
      style={{width: '100%', height:'200px', maxWidth:'1280px', position: 'relative'}}
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}>
      <a href={url}>{image}</a>
    </motion.div>
  );
};

export default BottomAdImage;
