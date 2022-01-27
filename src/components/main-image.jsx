import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';
import { sanityClient } from '../utils/sanity.server';

const MainImage = ({ title, slug, image: source }) => {
  const myCustomImageBuilder = (imageUrlBuilder, options) => {
    return imageUrlBuilder.width(
      options.width || Math.min(options.originalImageDimensions.width, 800)
    );
  };

  const imageProps = useNextSanityImage(sanityClient, source, {
    blurUpImageWidth: 124,
    blurUpImageQuality: 40,
    blurUpAmount: 200,
    imageBuilder: myCustomImageBuilder,
  });

  const image = source ? (
    <>
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}>
        <Image
          {...imageProps}
          alt={`Cover Image for ${title}`}
          sizes="(max-width: 2000px) 100vw, auto"
          layout="responsive"
        />
      </motion.div>
      <div className="main-image-caption my-1 font-secondary text-10 sm:text-16">
        {source.caption}
      </div>
      <hr />
    </>
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  );
  return (
    <div>
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default MainImage;
