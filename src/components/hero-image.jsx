import React from 'react';
import Link from 'next/link';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';
import { sanityClient } from '../utils/sanity.server';


// TODO: Find out how to fill in the height of the container?
const HeroImage = ({ title, slug, image: source }) => {
  const myCustomImageBuilder = (imageUrlBuilder) => {
    return imageUrlBuilder.width(1000);
  };

  const imageProps = useNextSanityImage(sanityClient, source, {
    blurUpImageWidth: 124,
    blurUpImageQuality: 40,
    blurUpAmount: 200,
    imageBuilder: myCustomImageBuilder,
  });

  const image = source ? (
    <div className="hero-img">
      <Image
        // {...imageProps}
        src={imageProps.src}
        loader={imageProps.loader}
        alt={`Hero Image for ${title}`}
        sizes="(max-width: 2000px) 70vw, auto"
        layout="fill"
        // className="hero-img"
        objectFit="cover"
      />
    </div>
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
