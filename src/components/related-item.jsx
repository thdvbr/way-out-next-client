import React from 'react';
import Link from 'next/link';
import Thumbnail from './thumbnail';

const RelatedItem = ({
  title,
  subtitle,
  subCategory,
  previewImage,
  slug,
  mixcloudUrl,
}) => {
  const isRadio = !!mixcloudUrl;
  const href = isRadio ? '/radios/[slug]' : '/posts/[slug]';
  const as = isRadio ? `/radios/${slug}` : `/posts/${slug}`;
  return (
    <div className="">
      <div className="px-2 pt-2 pb-4 z-70 lg:px-3 lg:pt-3 related-preview-block ">
        <div className="mb-0">
          <Thumbnail
            slug={slug}
            title={title}
            image={previewImage}
            width="345"
            height="329"
            mixcloudUrl={mixcloudUrl}
          />
        </div>
        <div className="flex items-center justify-between mb-2">
          <hr className="float-left related-line" />
          <span
            className="my-1 font-secondary text-9 sm:text-11 lg:text-13.5 xl:text-18 xl:leading-10 lg:leading-9 leading-snug"
            style={{ color: '#8a7536' }}
          >
            {subCategory}
          </span>
        </div>
        <div className="max-w-xs tracking-tight lg:mr-8">
          <Link
            as={as}
            href={href}
            className="block hover:underline font-main-bold text-15 leading-5 sm:text-18 sm:leading-5 md:text-20 md:leading-6 xl:text-29.5 lg:text-22.5 xl:leading-9"
          >
            {/* TODO: leading doesnt work here why?? */}

            {title}
          </Link>
          <p className="block font-main-light-italic text-15 sm:text-16 md:text-18 md:leading-5 leading-4 xl:text-25.5 xl:leading-8 lg:text-18.5">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RelatedItem;
