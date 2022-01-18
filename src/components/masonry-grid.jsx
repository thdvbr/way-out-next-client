import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion } from 'framer-motion';
import { getClient } from '../utils/sanity.server';
import MasonryItem from './masonry-item';
import { useAppContext } from '../context/state';
import {
  getMoreQuery
} from '../utils/queries';

const breakpointColumnsObj = {
  default: 4,
  1024: 3,
  499: 1,
};
const postVariants = {
  initial: { scale: 0.9, y: 30, opacity: 0 },
  enter: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: [0.48, 0.15, 0.25, 0.96] },
  },
  exit: {
    scale: 0.6,
    y: 100,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
  },
};

const MasonryGrid = ({ data, type }) => {
  const { query, searchResult } = useAppContext();
  const [posts, setPosts] = useState(data);

  useEffect(() => {
    setPosts(data);
  }, [searchResult]);

  const getMorePost = async () => {
    const newQuery = getMoreQuery(type, posts);
    const newPosts = await getClient().fetch(newQuery);
    setPosts((post) => [...post, ...newPosts]);
  };

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={{ exit: { transition: { staggerChildren: 0.1 } } }}>
      {!query ? (
        <InfiniteScroll dataLength={posts.length} next={getMorePost} hasMore>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
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
        </InfiniteScroll>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
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
      )}
    </motion.div>
  );
};

export default MasonryGrid;
