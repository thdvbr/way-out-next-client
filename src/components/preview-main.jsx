import React from 'react';
import Link from 'next/link';
import PreviewImage from './preview-image';

const PreviewMain = ({
  title,
  subtitle,
  previewImage,
  slug,
}) => (
  <div>
    <div className="mb-4">
      <PreviewImage
        slug={slug}
        title={title}
        image={previewImage}
        width="265"
      />
    </div>
    <div className="max-w-xs my-8">
      <Link as={`/posts/${slug}`} href="/posts/[slug]">
        <a className="hover:underline typo-main-preview-title">{title}</a>
      </Link>
      <p className="typo-main-preview-subtitle">{subtitle}</p>
    </div>
  </div>
);

export default PreviewMain;
