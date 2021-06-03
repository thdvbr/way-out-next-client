import React from 'react';
import Link from 'next/link';
import PreviewImage from './preview-image';

const PreviewMain = ({
  title, subtitle, previewImage, slug,
}) => (
  <div className="p-2 preview-block">
    <div className="mb-4">
      <PreviewImage slug={slug} title={title} image={previewImage} />
    </div>
    <div className="max-w-xl md:max-w-xs my-6">
      <Link as={`/posts/${slug}`} href="/posts/[slug]">
        <a href={`post title for ${title}`} className="hover:underline font-title text-22.5 sm:text-17.25 lg:text-21">{title}</a>
      </Link>
      <span>
        <br />
        <span className="preview-main-deco mr-4 h-4 ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span className="font-subtitle text-22 sm:text-15 lg:text-18.5 leading-4">
          {subtitle}
        </span>
      </span>
    </div>
  </div>
);

export default PreviewMain;
