import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import InfiniteScroll from 'react-infinite-scroll-component';
import _ from 'lodash';
import { motion } from 'framer-motion';
import { getClient } from '../utils/sanity.server';
import MasonryItem from './masonry-item';
import { useAppContext } from '../context/state';
import { getMoreQuery } from '../utils/queries';
import { cardVariants } from '../utils/animation';
import { BottomAdImage } from './index';

const breakpointColumnsObj = {
  default: 4,
  1024: 3,
  499: 1,
};

const MasonryGrid = ({ data, type, ads }) => {
  const { query, searchResult } = useAppContext();
  const [posts, setPosts] = useState(data);
  const [hasMore, setHasMore] = useState(true);
  const randomSlice1 = _.sample(ads);

  useEffect(() => {
    setPosts(data);
    setHasMore(true);
  }, [searchResult]);

  const getMorePost = async () => {
    const newQuery = getMoreQuery(type, posts);
    const newPosts = await getClient().fetch(newQuery);
    setPosts((post) => [...post, ...newPosts]);
    if (newPosts.length < 4) {
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
        {!query ? (
          <InfiniteScroll
            dataLength={posts.length}
            next={getMorePost}
            hasMore={hasMore}>
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
      {!hasMore && (
        <div className="mt-16">
          <BottomAdImage
            image={randomSlice1.adImage}
            url={randomSlice1.adUrl}
          />
        </div>
      )}
    </>
  );
};

export default MasonryGrid;
