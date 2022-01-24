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
import { cardVariants } from '../utils/animation';

const breakpointColumnsObj = {
  default: 4,
  1024: 3,
  499: 1,
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
              <motion.div key={post.slug} variants={cardVariants}>
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
            <motion.div key={post.slug} variants={cardVariants}>
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
