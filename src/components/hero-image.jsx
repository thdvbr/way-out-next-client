import React from 'react';
import Link from 'next/link';
import { urlForImage } from '../utils/sanity';

// TODO: Find out how to fill in the height of the container? 
const HeroImage = ({ title, slug, image: source }) => {
  const image = source ? (
      <img
          className="svg-scale"
      width={2000}
      alt={`Hero Image for ${title}`}
      src={urlForImage(source).height(1107).width(2000).url()}
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

export default HeroImage;
