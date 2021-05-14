import React from 'react';
import Link from 'next/link';
import { urlForImage } from '../utils/sanity';

const PreviewImage = ({
  title, slug, image: source, width, height,
}) => {
  const image = source ? (
    <img
      width={width}
      height={height}
      className="thumbnail-border preview-img-purple"
      alt={`Thumbnail for ${title}`}
      src={urlForImage(source).width(width).height(height).url()}
    />
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  );
  return (
    <div>
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default PreviewImage;
