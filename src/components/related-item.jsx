import React from 'react';
import Link from 'next/link';
import Thumbnail from './thumbnail';

const RelatedItem = ({
  title,
  subtitle,
  subCategory,
  previewImage,
  slug,
}) => (
  <div className="px-2 w-52 md:w-64">
    <div className="mb-0">
      <Thumbnail
        slug={slug}
        title={title}
        image={previewImage}
        width="200"
        height="200"
      />
    </div>
    <div className="flex justify-between items-center">
      <span className="preview-main-deco">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <span className="font-secondary text-11 leading-snug tracking-wider" style={{ color: '#8a7536' }}>
        {subCategory}
      </span>
    </div>
    <div className="max-w-xs my-3">
      <Link as={`/posts/${slug}`} href="/posts/[slug]">
        <a className="hover:underline font-main-bold text-18 leading-snug">{title}</a>
      </Link>
      <p className="font-main-light-italic text-18 leading-snug">{subtitle}</p>
    </div>
  </div>
);

export default RelatedItem;
