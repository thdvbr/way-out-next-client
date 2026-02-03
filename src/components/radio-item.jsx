// RadioItem.jsx
import React from 'react';
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
    <div className="group">
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
          // Pass this so Thumbnail knows it's radio
        )}
      </div>
      <div className="flex flex-col flex-grow px-1 pt-2 pb-4 transition-colors duration-200 group-hover:bg-yellow">
        {episodeLabel && (
          <p className="mb-2 text-13 group-hover:text-black">{episodeLabel}</p>
        )}
        <h3 className="mb-1 text-22 font-title group-hover:text-black">
          {title}
        </h3>
        {subtitle && (
          <p className="text-17 font-agrandir group-hover:text-black">
            {subtitle}
          </p>
        )}
        <ul className="flex flex-wrap gap-1 text-xs tags ">
          {tags?.map((tag, index) => (
            <li
              key={tag._key || tag + '-' + index}
              className="mt-3 px-4 mr-1 py-0.5 border-white rounded-sm bg-white text-black text-12 font-agrandir group-hover:bg-black group-hover:border-black group-hover:text-white">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RadioItem;
