/* eslint-disable */

import React, { useState, useEffect } from 'react';
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

const MasonryGrid = ({ data, type, ItemComponent = MasonryItem }) => {
  // const { query, searchResult } = useAppContext();
  const [posts, setPosts] = useState(data);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPosts(data);
    setHasMore(true);
  }, [data]);

  const getMorePost = async () => {
    const newQuery = getMoreQuery(type, posts);
    const newPosts = await getClient().fetch(newQuery);
    setPosts((post) => [...post, ...newPosts]);
    if (newPosts.length < 8) {
      setHasMore(false);
    }
  };

  return (
    <>
      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={{ exit: { transition: { staggerChildren: 0.1 } } }}>
        <InfiniteScroll
          dataLength={posts.length}
          next={getMorePost}
          hasMore={hasMore}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {posts.map((post) => (
              <ItemComponent key={post._id} {...post} />
            ))}
          </Masonry>
        </InfiniteScroll>
      </motion.div>
    </>
  );
};

export default MasonryGrid;
