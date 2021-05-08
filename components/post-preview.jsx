import React from 'react';
import Link from 'next/link';
import PreviewImage from './preview-image';

const PostPreview = ({ title, subtitle, previewImage, slug }) => (
  <>
    <div className="mb-5">
      <PreviewImage slug={slug} title={title} image={previewImage} />
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
