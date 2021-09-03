import React from 'react';
import Link from 'next/link';
import Thumbnail from './thumbnail';

const MasonryItem = ({
  title, subtitle, previewImage, slug,
}) => (
  <div className="px-1 py-1 preview-block">
    <div className="mb-4 sm:mb-2">
      <Thumbnail slug={slug} title={title} image={previewImage} />
    </div>
    <div className="max-w-xl md:max-w-xs xl:max-w-sm my-5 mr-5 sm:my-0 sm:mr-2">
      <Link as={`/posts/${slug}`} href="/posts/[slug]">
        <a
          href={`post title for ${title}`}
          className="font-title text-32.5 leading-tight sm:leading-4 lg:leading-7 xl:leading-9 sm:text-17.25 lg:text-21 xl:text-28"
        >
          {title}
        </a>
      </Link>
      <span>
        <br />
        <div>
          <hr className="line float-left transform translate-y-4" />
          <span className="font-main leading-tight text-28 sm:text-15 lg:text-18.5 xl:text-24 lg:leading-6 xl:leading-8">
            &nbsp;&nbsp;
            {subtitle}
          </span>
        </div>
      </span>
    </div>
  </div>
);

export default MasonryItem;
