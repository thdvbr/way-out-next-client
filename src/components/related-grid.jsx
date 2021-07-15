import React from 'react';
import RelatedItem from './related-item';

const RelatedGrid = ({ posts }) => (
  <section className="mx-6 md:mx-28">
    <h2 className="font-title text-24 text-center mb-16 xl:text-55">More to read</h2>
    <div className="grid grid-cols-2 grid-rows-2 gap-6 justify-items-center sm:flex sm:justify-between">
      {posts.map((post) => (
        <RelatedItem
          key={post.slug}
          title={post.title}
          subtitle={post.subtitle}
          previewImage={post.previewImage}
          subCategory={post.subCategory}
          slug={post.slug}
        />
      ))}
    </div>
  </section>
);

export default RelatedGrid;
