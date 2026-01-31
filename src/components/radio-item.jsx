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
  type,
}) => {
  return (
    <div className="">
      <div className="">
        {heroImage && (
          <Thumbnail slug={slug} title={title} image={heroImage} type={type} />
        )}
      </div>
      <div className="flex flex-col flex-grow p-4">
        <p>{formatDate(publishedAt)}</p>
        <h3 className="mb-1 text-xl font-title">{title}</h3>
        <p className="mb-2 text-sm text-gray-600">{subtitle}</p>
        <ul className="flex-1 text-sm tags">
          {tags?.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {mixcloudUrl && (
          <a
            href={mixcloudUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-blue-600 underline"
          >
            Listen on Mixcloud
          </a>
        )}
      </div>
    </div>
  );
};

export default RadioItem;
