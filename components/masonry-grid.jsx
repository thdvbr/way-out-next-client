import React from 'react';
import Masonry from 'react-masonry-css';
import PreviewMain from './preview-main';

const MasonryGrid = ({ posts }) => (
  <Masonry
    breakpointCols={4}
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column">
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

export default MasonryGrid;
