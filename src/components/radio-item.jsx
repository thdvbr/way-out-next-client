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
  publishedAt,
}) => {
  return (
    <div className="">
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
      <div className="flex flex-col flex-grow p-4">
        <p>{formatDate(publishedAt)}</p>
        <h3 className="mb-1 text-xl font-title">{title}</h3>
        {subtitle && <p className="mb-2 text-sm text-gray-600">{subtitle}</p>}
        <ul className="flex-1 text-sm tags">
          {tags?.slice(0, 3).map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RadioItem;
