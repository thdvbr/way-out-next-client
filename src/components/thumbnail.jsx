import React from 'react';
import Link from 'next/link';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';
// import { motion } from 'framer-motion';
import { sanityClient } from '../utils/sanity.server';

// const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const Thumbnail = ({ title, slug, image: source, width, height }) => {
  const myCustomImageBuilder = (imageUrlBuilder) => {
    return imageUrlBuilder.width(width).height(height);
  };

  const imageProps = useNextSanityImage(sanityClient, source, {
    blurUpImageWidth: 124,
    blurUpImageQuality: 40,
    blurUpAmount: 200,
    imageBuilder: myCustomImageBuilder,
  });

  // TODO: BlurDataURL warning, make blur work :( )
  const image = source ? (
    <div className="thumbnail-border thumbnail-drop-shadow" style={{ overflow: 'hidden' }}>
      {/* <motion.div whileHover={{ scale: 1.1 }} transition={transition}> */}
      <div>
        <Image
          {...imageProps}
          layout="responsive"
          // check for responsive option..
          // sizes={`${width}px, ${height}px`}
          sizes="(max-width: 800px) 100vw, 800px"
          alt={`Thumbnail for ${title}`}
          placeholder="blur"
        />
      </div>
      {/* </motion.div> */}
    </div>
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  );
  return (
    <div>
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

export default Thumbnail;
