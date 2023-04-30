import React from 'react';
import { motion } from 'framer-motion';
import PostTitle from './post-title';
import PostSubtitle from './post-subtitle';
import MainImage from './main-image';
import Date from './date';

const PostHeader = ({
  title,
  subtitle,
  mainImage,
  publishedAt,
  credits,
  subCategory,
}) => {
  // returns where Y is in a range, from 0 to 1
  // second array [0,1] = where our start and end of scroll is

  return (
    <>
      <PostTitle>{title}</PostTitle>
      <PostSubtitle>{subtitle}</PostSubtitle>
      <div className="mx-auto">
        <MainImage title={title} image={mainImage} />
      </div>
      <div className="mx-14 my-8 text-center font-agrandir text-14 leading-5 sm:leading-6 sm:text-16 lg:text-17 xl:text-22.5 tracking-wider">
        <p className="underline">{subCategory}</p>
        <span>Published on: </span>
        <Date dateString={publishedAt} />
        {credits && <p>{credits}</p>}
      </div>
    </>
  );
};

export default PostHeader;
