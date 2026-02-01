import React from 'react';
import Link from 'next/link';
import Thumbnail from './thumbnail';

const MasonryItem = ({
  title,
  subtitle,
  previewImage,
  slug,
  mainCategory,
  mixcloudUrl, // To detect if it's radio
}) => {
  // Determine if this is a radio show or a post
  const isRadio = !!mixcloudUrl;
  // Route to /radio/[slug] for radio, /posts/[slug] for posts
  const href = isRadio ? '/radios/[slug]' : '/posts/[slug]';
  const as = isRadio
    ? `/radios/${slug.current || slug}`
    : `/posts/${slug.current || slug}`;
  return (
    <div className="pb-1 sm:pb-0 sm:py-2 preview-block">
      <div className="mb-4 sm:mb-2">
        <Thumbnail
          slug={slug}
          title={title}
          image={previewImage}
          mainCategory={mainCategory?.title}
        />
      </div>
      <div className="max-w-xl my-5 mr-5 masonry-item-text md:max-w-xs xl:max-w-sm sm:my-0 sm:mr-2 sm:mt-3">
        <Link
          as={as}
          href={href}
          className="block font-title text-25 leading-tight sm:text-17.25 lg:leading-7 xl:leading-9 lg:text-21 xl:text-28">
          {title}
        </Link>
        <span>
          <div>
            <hr className="float-left mr-2 transform translate-y-4 line sm:translate-y-2 md:translate-y-3 xl:translate-y-4" />
            <span className="block font-main leading-tight text-21 sm:text-15 lg:text-18.5 xl:text-24 lg:leading-6 xl:leading-8 sm:mb-2">
              {subtitle}
            </span>
          </div>
        </span>
      </div>
    </div>
  );
};

export default MasonryItem;
