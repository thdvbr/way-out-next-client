import React from 'react';
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
}) => (
  <>
    <PostTitle>{title}</PostTitle>
    <PostSubtitle>{subtitle}</PostSubtitle>
    <div className="mb-8 md:mb-16 sm:mx-0">
      <MainImage title={title} image={mainImage} />
    </div>
    <div className="mb-6 text-lg font-secondary">
      <p>{subCategory}</p>
      <span>Published on: </span>
      <Date dateString={publishedAt} />
      { credits && <p>{credits}</p> }
    </div>
  </>
);

export default PostHeader;
