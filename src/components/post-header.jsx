import React from 'react';
import { motion } from 'framer-motion';
import PostTitle from './post-title';
import PostSubtitle from './post-subtitle';
import MainImage from './main-image';
import Date from './date';

let easing = [0.175, 0.85, 0.42, 0.96];
const textVariants = {
  exit: { y: 100, opacity: 0, transition: { duration: 0.5, ease: easing } },
  enter: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.1, duration: 0.5, ease: easing },
  },
};

const PostHeader = ({
  title,
  subtitle,
  mainImage,
  publishedAt,
  credits,
  subCategory,
}) => (
  <>
    <motion.div variants={textVariants}>
      <PostTitle>{title}</PostTitle>
      <PostSubtitle>{subtitle}</PostSubtitle>
    </motion.div>
    <div className="mx-auto">
      <MainImage title={title} image={mainImage} />
    </div>
    <div className="mx-14 my-8 text-center font-agrandir text-19 leading-6 tracking-wider">
      <p className="underline">{subCategory}</p>
      <span>Published on: </span>
      <Date dateString={publishedAt} />
      {credits && <p>{credits}</p>}
    </div>
  </>
);

export default PostHeader;
