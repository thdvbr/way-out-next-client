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
    // console.log('Is same reference?', prevDataRef.current === data);
    // console.log('MasonryGrid data changed:', data);
    // prevDataRef.current = data;
    console.log('=== MASONRY USEEFFECT ===');
    console.log('data.length:', data.length);
    console.log('Setting hasMorePosts to:', data.length >= 8);
    setPosts(data);
    // If we have 8+ items, there might be more to load
    // If less than 8, we know there's nothing more
    setHasMorePosts(data.length >= 8);
  }, [data]);

  const getMorePost = async () => {
    console.log('=== GET MORE POST CALLED ===');
    try {
      const newQuery = getMoreQuery(categoryTitle, posts);
      const newPosts = await getClient().fetch(newQuery);
      setPosts((post) => [...post, ...newPosts]);
      if (newPosts.length < 8) {
        setHasMorePosts(false);
      }
    } catch (error) {
      console.error('Failed to fetch more posts:', error);
      setHasMorePosts(false); // Stop trying if it fails
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
