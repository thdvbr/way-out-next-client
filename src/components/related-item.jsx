import React from 'react';
import Link from 'next/link';
import Thumbnail from './thumbnail';

const RelatedItem = ({
  title, subtitle, subCategory, previewImage, slug,
}) => {
  return (
    <div className="px-2 pt-2 pb-5 w-48 md:w-64 xl:w-96 related-preview-block overflow-auto">
      <div className="mb-0">
        <Thumbnail
          slug={slug}
          title={title}
          image={previewImage}
          width="345"
          height="329"
        />
      </div>
      <div className="flex justify-between items-center">
        <hr className="related-line float-left" />
        <span
          className="font-secondary text-11 lg:text-13.5 xl:text-18 xl:leading-10 lg:leading-9 leading-snug"
          style={{ color: '#8a7536' }}
        >
          {subCategory}
        </span>
      </div>
      <div className="max-w-xs sm:mr-8">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline font-main-bold text-18 leading-snug xl:text-29.5 lg:text-22.5 xl:leading-9 lg:leading-6">
            {title}
          </a>
        </Link>
        <p className="font-main-light-italic text-18 leading-snug xl:text-25.5 xl:leading-8 lg:text-18.5 lg:leading-5">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default RelatedItem;
