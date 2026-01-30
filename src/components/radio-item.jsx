// RadioItem.jsx
import React from 'react';
import Link from 'next/link';
import { formatDate } from '../utils/formatDate';

const RadioItem = ({
  title,
  subtitle,
  heroImage,
  tracklist,
  mixcloudLink,
  tags,
  slug,
  publishedAt,
}) => {
  return (
    <div className="flex flex-col overflow-hidden bg-gray-100 rounded-lg shadow-md radio-card">
      <div className="relative w-full h-48">
        {heroImage && (
          <img
            src={heroImage.url}
            alt={title}
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <div className="flex flex-col flex-grow p-4">
        <p>{formatDate(publishedAt)}</p>
        <h3 className="mb-1 text-xl font-title">{title}</h3>
        <p className="mb-2 text-sm text-gray-600">{subtitle}</p>
        <ul className="flex-1 text-sm">
          {tracklist?.map((track, idx) => (
            <li key={idx}>
              {track.artist} - {track.title}
            </li>
          ))}
        </ul>
        {mixcloudLink && (
          <a
            href={mixcloudLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-blue-600 underline">
            Listen on Mixcloud
          </a>
        )}
      </div>
    </div>
  );
};

export default RadioItem;
