import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';
import { sanityClient } from '../utils/sanity.server';

const MainImage = ({ title, slug, image: source }) => {
  const dimensions = source?.asset?.metadata?.dimensions;
  const isPortrait = dimensions && dimensions.height > dimensions.width * 1.2;

  const isSquare = dimensions
    && Math.abs(dimensions.height - dimensions.width) < dimensions.width * 0.2;

  // eslint-disable-next-line no-nested-ternary
  const sizeClass = isPortrait
    ? 'w-full sm:w-3/4 sm:mx-auto'
    : isSquare
      ? 'w-full sm:w-4/5 sm:mx-auto'
      : 'w-full';

  const myCustomImageBuilder = (imageUrlBuilder, options) => {
    return imageUrlBuilder
      .width(Math.min(options.width, 1800))
      .fit('max')
      .auto('format');
  };

  const imageProps = useNextSanityImage(sanityClient, source || null, {
    blurUpImageWidth: 124,
    blurUpImageQuality: 40,
    blurUpAmount: 200,
    imageBuilder: myCustomImageBuilder,
  });

  if (!source?.asset) {
    return <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />;
  }

  const blurDataURL = source?.asset?.metadata?.lqip;

  const image = source ? (
    <>
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}>
        <Image
          {...imageProps}
          alt={`Cover Image for ${title}`}
          placeholder={blurDataURL ? 'blur' : 'empty'}
          blurDataURL={blurDataURL}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </motion.div>
      <div className="my-1 main-image-caption font-secondary text-10 sm:text-16">
        {source.caption}
      </div>
    </>
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  );
  return (
    <div className={sizeClass}>
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default MainImage;
