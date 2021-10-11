import React from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import PostTitle from './post-title';
import PostSubtitle from './post-subtitle';
import MainImage from './main-image';
import Date from './date';

const easing = [0.175, 0.85, 0.42, 0.96];
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
}) => {
  const { scrollYProgress } = useViewportScroll();
// returns where Y is in a range, from 0 to 1
// second array [0,1] = where our start and end of scroll is
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  return (
    <>
      <motion.div variants={textVariants}>
        <PostTitle>{title}</PostTitle>
        <PostSubtitle>{subtitle}</PostSubtitle>
      </motion.div>
      <motion.div style={{ opacity: opacity, scale: scale }} className="mx-auto">
        <MainImage title={title} image={mainImage} />
      </motion.div>
      <div className="mx-14 my-8 text-center font-agrandir text-14 leading-5 sm:text-19 xl:text-22.5 lg:text-17 sm:leading-6 tracking-wider">
        <p className="underline">{subCategory}</p>
        <span>Published on: </span>
        <Date dateString={publishedAt} />
        {credits && <p>{credits}</p>}
      </div>
    </>
  )
};

export default PostHeader;
