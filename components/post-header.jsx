import React from 'react';
import PostTitle from './post-title';
import MainImage from './main-image';
import Date from './date';

const PostHeader = ({ title, mainImage, date }) => (
  <>
    <PostTitle>{title}</PostTitle>
    <div className="mb-8 md:mb-16 sm:mx-0">
      <MainImage title={title} image={mainImage} />
    </div>
    {/* <div className='mb-6 text-lg'>
        <Date dateString={date} />
      </div> */}
  </>
);

export default PostHeader;
