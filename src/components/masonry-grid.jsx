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
  ItemComponent = MasonryItem,
}) => {
  const { hasMorePosts, setHasMorePosts } = useAppContext();
  const [posts, setPosts] = useState(data);

  const prevDataRef = useRef();
  useEffect(() => {
    console.log('Is same reference?', prevDataRef.current === data);
    console.log('MasonryGrid data changed:', data);
    prevDataRef.current = data;
    setPosts(data);
    setHasMorePosts(true);
  }, [data]);

  const getMorePost = async () => {
    const newQuery = getMoreQuery(categoryTitle, posts);
    const newPosts = await getClient().fetch(newQuery);
    setPosts((post) => [...post, ...newPosts]);
    if (newPosts.length < 8) {
      setHasMorePosts(false);
      // setAllPostsLoaded(true);
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
          hasMore={hasMorePosts}>
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
