/* eslint-disable */
// RadioItem.jsx
import React from 'react';
import Link from 'next/link';
import { formatDate } from '../utils/formatDate';
import Thumbnail from './thumbnail';

const RadioItem = ({
  title,
  subtitle,
  heroImage,
  // tracklist,
  mixcloudUrl,
  tags,
  slug,
  // description,
  episodeLabel,
}) => {
  return (
    <div className="group radio-preview-block">
      <div className="">
        {heroImage && (
          <Thumbnail
            slug={slug}
            title={title}
            image={heroImage}
            mixcloudUrl={mixcloudUrl}
            width="500"
            height="500"
          />
        )}
      </div>
      <div className="flex flex-col flex-grow px-2 pt-2 pb-2 transition-colors duration-200 border-b-2 border-l-2 border-r-2 border-black md:group-hover:bg-yellow radio-preview-text-box">
        {episodeLabel && (
          <p className="mb-3 tracking-wider text-13 md:group-hover:text-black radio-preview-episode-label">
            {episodeLabel}
          </p>
        )}
        <div className="mb-1 leading-tight text-22 font-title md:group-hover:text-black radio-preview-title">
          <Link as={`/radios/${slug.current || slug}`} href="/radios/[slug]">
            {title}
          </Link>
        </div>
        {subtitle && (
          <p className="tracking-wider leading-1 text-17 font-agrandir md:group-hover:text-black radio-preview-subtitle">
            {subtitle}
          </p>
        )}
        <ul className="flex flex-wrap gap-1 text-xs leading-tight tags ">
          {tags?.map((tag, index) => (
            <li
              key={tag._key || tag + '-' + index}
              className="mt-3 px-2 mr-1 py-0.5 border-white rounded-sm bg-white text-black text-12 tracking-wider font-agrandir md:group-hover:bg-black md:group-hover:border-black md:group-hover:text-white radio-tags">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RadioItem;
