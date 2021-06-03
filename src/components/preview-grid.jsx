import React from 'react';
import Masonry from 'react-masonry-css';
import PreviewMain from './preview-main';

const breakpointColumnsObj = {
  default: 4,
  768: 3,
  499: 1,
};

const PreviewGrid = ({ posts }) => (
  <Masonry
    breakpointCols={breakpointColumnsObj}
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column"
  >
    {posts.map((post) => (
      <PreviewMain
        key={post.slug}
        title={post.title}
        subtitle={post.subtitle}
        previewImage={post.previewImage}
        slug={post.slug}
      />
    ))}
  </Masonry>
);

export default PreviewGrid;
