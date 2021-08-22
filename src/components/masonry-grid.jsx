import React from 'react';
import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';
import MasonryItem from './masonry-item';

const breakpointColumnsObj = {
  default: 4,
  768: 3,
  499: 1,
};
const postVariants = {
  initial: { scale: 0.9, y: 30, opacity: 0 },
  enter: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
  },
  exit: {
    scale: 0.6,
    y: 100,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
  },
};

const MasonryGrid = ({ posts }) => (
  <motion.div
    initial="initial"
    animate="enter"
    exit="exit"
    variants={{ exit: { transition: { staggerChildren: 0.1 } } }}
  >
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid mt-4"
      columnClassName="my-masonry-grid_column"
    >
      {posts.map((post) => (
        <motion.div key={post.slug} variants={postVariants}>
          <MasonryItem
            key={post.slug}
            title={post.title}
            subtitle={post.subtitle}
            previewImage={post.previewImage}
            slug={post.slug}
          />
        </motion.div>
      ))}
    </Masonry>
  </motion.div>
);

export default MasonryGrid;
