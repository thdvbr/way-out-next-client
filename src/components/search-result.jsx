/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';
import MasonryItem from './masonry-item';
import { useAppContext } from '../context/state';
import { cardVariants } from '../utils/animation';

const breakpointColumnsObj = {
  default: 4,
  1024: 3,
  499: 1,
};

const SearchResult = () => {
  const { searchIsOpen, errorMsg, setErrorMsg, isLoading, setIsLoading } =
    useAppContext();
  const [searchResult, setSearchResult] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();
  const searchKeyword =
    router && router.query && router.query.keyword ? router.query.keyword : '';

  useEffect(() => {
    const searchEndpoint = (searchQuery) => `/api/search?q=${searchQuery}`;
    if (searchKeyword) {
      // setQuery(searchKeyword);
      setIsLoading(true);
      setErrorMsg('');
      fetch(searchEndpoint(searchKeyword))
        .then((res) => res.json())
        .then((res) => {
          setSearchResult(res.results);
          res.results.length === 0
            ? setErrorMsg('Nothing Found')
            : setErrorMsg('');
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setErrorMsg('Please enter a search keyword');
      setSearchResult([]);
      //   setSearchIsOpen(false);
    }
  }, [searchKeyword]);
  return (
    <>
      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={{ exit: { transition: { staggerChildren: 0.1 } } }}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={`${searchIsOpen && 'sm:mt-5'} my-masonry-grid`}
          columnClassName="my-masonry-grid_column">
          {searchResult.map((post) => (
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
      </motion.div>
      <div className="flex justify-center font-title text-24 sm:text-33 ">
        {isLoading && <span className="mt-14 mb-28">... Loading</span>}
        {errorMsg && <span className="mt-14 mb-28">{errorMsg}</span>}
      </div>
    </>
  );
};

export default SearchResult;
