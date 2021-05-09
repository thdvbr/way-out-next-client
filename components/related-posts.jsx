import React from 'react';
import PostRelatedPreview from './post-related-preview';

const RelatedPosts = ({ posts }) => (
  <section className="mx-24">
    <h2 className="typo-more-to-read text-center mb-16">More to read</h2>
    <div className="flex justify-between">
      {posts.map((post) => (
        <PostRelatedPreview
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

export default RelatedPosts;
