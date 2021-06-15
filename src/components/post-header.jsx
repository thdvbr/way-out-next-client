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
    <div className="mx-auto">
      <MainImage title={title} image={mainImage} />
    </div>
    <div className="mx-14 my-8 text-center font-agrandir text-19 leading-6 tracking-wider">
      <p className="underline">{subCategory}</p>
      <span>Published on: </span>
      <Date dateString={publishedAt} />
      { credits && <p>{credits}</p> }
    </div>
  </>
);

export default PostHeader;
