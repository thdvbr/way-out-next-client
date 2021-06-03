import React from 'react';
import Masonry from 'react-masonry-css';
import MasonryItem from './masonry-item';

const breakpointColumnsObj = {
  default: 4,
  768: 3,
  499: 1,
};

const MasonryGrid = ({ posts }) => (
  <Masonry
    breakpointCols={breakpointColumnsObj}
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column"
  >
    {posts.map((post) => (
      <MasonryItem
        key={post.slug}
        title={post.title}
        subtitle={post.subtitle}
        previewImage={post.previewImage}
        slug={post.slug}
      />
    ))}
  </Masonry>
);

export default MasonryGrid;
