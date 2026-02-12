/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
import Masonry from 'react-masonry-css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion } from 'framer-motion';
import { getClient } from '../utils/sanity.server';
import MasonryItem from './masonry-item';
import { useAppContext } from '../context/state';
import { getMoreQuery } from '../utils/queries';
import { cardVariants } from '../utils/animation';

const breakpointColumnsObj = {
  default: 4,
  1024: 3,
  499: 1,
};

const MasonryGrid = ({
  data,
  categoryTitle = null,
  interleave = false, // true for index page, false for others
  ItemComponent = MasonryItem,
}) => {
  const { hasMorePosts, setHasMorePosts } = useAppContext();
  const [posts, setPosts] = useState(data);
  const [visibleCount, setVisibleCount] = useState(9);

  const prevDataRef = useRef();

  useEffect(() => {
    setHasMorePosts(data.length > visibleCount);
  }, [data, visibleCount]);

  const visiblePosts = data.slice(0, visibleCount);

  const getMorePost = () => {
    const newCount = visibleCount + 9;
    setVisibleCount(newCount);
    if (newCount >= data.length) {
      setHasMorePosts(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} // Start invisible
        animate={{ opacity: 1 }} // Fade in
        exit={{ opacity: 0 }} // Fade out
        transition={{ duration: 0.8 }} // Slower = smoother
        variants={{ exit: { transition: { staggerChildren: 0.1 } } }}>
        <InfiniteScroll
          dataLength={visiblePosts.length}
          next={getMorePost}
          hasMore={hasMorePosts}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {visiblePosts.map((post) => (
              <ItemComponent key={post._id} {...post} />
            ))}
          </Masonry>
        </InfiniteScroll>
      </motion.div>
    </>
  );
};

export default MasonryGrid;
