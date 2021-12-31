import React from 'react';
import RelatedItem from './related-item';

const RelatedGrid = ({ posts }) => (
  <section className="mt-14 px-1 sm:mx-0 mb-10">
    <h2 className="font-title text-24 sm:text-40 xl:text-55 lg:text-42 text-center mb-6 md:mb-16">More to read</h2>
    <div className="grid grid-cols-2 grid-rows-2 sm:gap-6 justify-items-center sm:flex sm:justify-between xl:gap-12">
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
