import React from 'react';
import Link from 'next/link';
import Thumbnail from './thumbnail';

const MasonryItem = ({
  title, subtitle, previewImage, slug,
}) => (
  <div className="pb-1 sm:pb-0 sm:py-2 preview-block">
    <div className="mb-4 sm:mb-2">
      <Thumbnail slug={slug} title={title} image={previewImage} />
    </div>
    <div className="masonry-item-text max-w-xl md:max-w-xs xl:max-w-sm my-5 mr-5 sm:my-0 sm:mr-2 sm:mt-3">
      <Link
        as={`/posts/${slug}`}
        href="/posts/[slug]"
        className="block font-title text-25 leading-tight sm:text-17.25 lg:leading-7 xl:leading-9 lg:text-21 xl:text-28"
      >

        {title}

      </Link>
      <span>
        <div>
          <hr className="line float-left transform translate-y-4 sm:translate-y-2 md:translate-y-3 xl:translate-y-4 mr-2" />
          <span className="block font-main leading-tight text-21 sm:text-15 lg:text-18.5 xl:text-24 lg:leading-6 xl:leading-8 sm:mb-2">
            {subtitle}
          </span>
        </div>
      </span>
    </div>
  </div>
);

export default MasonryItem;
