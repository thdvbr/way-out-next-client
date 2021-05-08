import React from 'react';
import Link from 'next/link';
import { urlForImage } from '../utils/sanity';

const PreviewImage = ({ title, slug, image: source }) => {
  const image = source ? (
    <img
      width={300}
      height={300}
      alt={`Preview Image for ${title}`}
      src={urlForImage(source).height(300).width(300).url()}
    />
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  );
  return (
    <div>
      {slug ? (
        <Link as={`/posts/${slug}`} href='/posts/[slug]'>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default PreviewImage;
