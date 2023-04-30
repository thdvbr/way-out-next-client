import React from 'react';
import Link from 'next/link';
import Thumbnail from './thumbnail';

const RelatedItem = ({
  title, subtitle, subCategory, previewImage, slug,
}) => {
  return (
    <div className="">
      <div className="z-70 px-2 pt-2 lg:px-3 lg:pt-3 pb-2 related-preview-block ">
      <div className="mb-0">
        <Thumbnail
          slug={slug}
          title={title}
          image={previewImage}
          width="345"
          height="329"
        />
      </div>
      <div className="flex justify-between items-center mb-2">
        <hr className="related-line float-left" />
        <span
          className="my-1 font-secondary text-9 sm:text-11 lg:text-13.5 xl:text-18 xl:leading-10 lg:leading-9 leading-snug"
          style={{ color: '#8a7536' }}
        >
          {subCategory}
        </span>
      </div>
      <div className="max-w-xs lg:mr-8 tracking-tight">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          {/* TODO: leading doesnt work here why?? */}
          <a className="block hover:underline font-main-bold text-15 leading-5 sm:text-18 sm:leading-5 md:text-20 md:leading-6 xl:text-29.5 lg:text-22.5 xl:leading-9">
            {title}
          </a>
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
