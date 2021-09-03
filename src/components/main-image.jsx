import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { urlForImage } from '../utils/sanity';

const MainImage = ({ title, slug, image: source }) => {
  const easing = [0.175, 0.85, 0.42, 0.96];

  const imageVariants = {
    exit: { y: 150, opacity: 0, transition: { duration: 0.5, ease: easing } },
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: easing,
      },
    },
  };
  const image = source ? (
    <>
      <motion.img
        variants={imageVariants}
        width={2000}
        height={1000}
        alt={`Cover Image for ${title}`}
        src={urlForImage(source).height(1000).width(2000).url()}
      />
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
