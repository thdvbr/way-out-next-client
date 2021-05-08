import React from 'react';
import Link from 'next/link';
import MainImage from './main-image';

const PostPreview = ({ title, subtitle, mainImage, slug }) => (
  <>
    <div className="mb-5">
      <MainImage slug={slug} title={title} image={mainImage} />
    </div>
    <h3 className="mb-3">
      <Link as={`/posts/${slug}`} href="/posts/[slug]">
        <a className="hover:underline typo-preview-title">{title}</a>
      </Link>
      <p className="typo-preview-subtitle">{subtitle}</p>
    </h3>
  </>
);

export default PostPreview;
