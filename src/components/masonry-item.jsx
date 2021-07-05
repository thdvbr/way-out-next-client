import React from 'react';
import Link from 'next/link';
import Thumbnail from './thumbnail';

const MasonryItem = ({
  title, subtitle, previewImage, slug,
}) => (
  <div className="px-1 py-1 preview-block">
    <div className="mb-4">
      <Thumbnail slug={slug} title={title} image={previewImage} />
    </div>
    <div className="max-w-xl md:max-w-xs my-6">
      <Link as={`/posts/${slug}`} href="/posts/[slug]">
        <a href={`post title for ${title}`} className="hover:underline font-title text-32.5 leading-9 sm:text-17.25 lg:text-21">{title}</a>
      </Link>
      <span>
        <br />
        <span className="preview-main-deco mr-4 h-4 ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span className="font-main text-28 sm:text-15 lg:text-18.5 leading-8">
          {subtitle}
        </span>
      </span>
    </div>
  </div>
);

export default MasonryItem;
