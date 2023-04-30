import React from 'react';
import Link from 'next/link';
import { useNextSanityImage } from 'next-sanity-image';
import { useCurrentWidth } from 'react-socks';
import Image from 'next/image';
import { sanityClient } from '../utils/sanity.server';

const HeroImage = ({ title, slug, image: source }) => {
  const myCustomImageBuilder = (imageUrlBuilder) => {
    return imageUrlBuilder.width(1000);
  };
  const width = useCurrentWidth();

  const imageProps = useNextSanityImage(sanityClient, source, {
    blurUpImageWidth: 124,
    blurUpImageQuality: 40,
    blurUpAmount: 200,
    imageBuilder: myCustomImageBuilder,
  });

  const image = source ? (
    <div className="block">
      {width > 768 ? (
        <Image
          src={imageProps.src}
          loader={imageProps.loader}
          alt={`Hero Image for ${title}`}
          width={1200}
          height={600}
          layout="responsive"
          objectFit="cover"
        />
      ) : (
        <Image
          src={imageProps.src}
          loader={imageProps.loader}
          alt={`Hero Image for ${title}`}
          width={1000}
          height={700}
          layout="responsive"
          objectFit="cover"
        />
      )}
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
