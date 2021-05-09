import React from 'react';
import Link from 'next/link';
import PreviewImage from './preview-image';

const RelatedPreview = ({
  title,
  subtitle,
  subCategory,
  previewImage,
  slug,
}) => (
  <div className="flex flex-col">
    <div className="mb-4">
      <PreviewImage
        slug={slug}
        title={title}
        image={previewImage}
        width="261"
        height="249"
      />
    </div>
    <div className="flex justify-between items-center">
      <hr className="related-article-deco" />
      <p className="typo-related-preview-sub-category tracking-wider">
        {subCategory}
      </p>
    </div>
    <div className="max-w-xs my-8">
      <Link as={`/posts/${slug}`} href="/posts/[slug]">
        <a className="hover:underline typo-related-preview-title">{title}</a>
      </Link>
      <p className="typo-related-preview-subtitle">{subtitle}</p>
    </div>
  </div>
);

export default RelatedPreview;
