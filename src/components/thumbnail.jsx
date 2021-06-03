import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { urlForImage } from '../utils/sanity';

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const Thumbnail = ({
  title, slug, image: source, width, height,
}) => {
  const image = source ? (
    <div
      className="thumbnail-border preview-img-purple"
      style={{ overflow: 'hidden' }}
    >
      <motion.img
        width={width}
        height={height}
        alt={`Thumbnail for ${title}`}
        src={urlForImage(source).width(width).height(height).url()}
        whileHover={{ scale: 1.1 }}
        transition={transition}
      />
    </div>
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

export default Thumbnail;
