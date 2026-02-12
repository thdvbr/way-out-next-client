import React from 'react';
import Link from 'next/link';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';
// import { motion } from 'framer-motion';
import { sanityClient } from '../utils/sanity.server';

// const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const Thumbnail = ({
  title,
  slug,
  image: source,
  width,
  height,
  type,
  mixcloudUrl, // Radio shows have this field
  mainCategory, // Posts have this field
}) => {
  const myCustomImageBuilder = (imageUrlBuilder) => {
    return imageUrlBuilder.width(width).height(height);
  };

  const imageProps = useNextSanityImage(sanityClient, source, {
    blurUpImageWidth: 124,
    blurUpImageQuality: 40,
    blurUpAmount: 200,
    imageBuilder: myCustomImageBuilder,
  });

  // Determine if this is a radio show or a post
  const isRadio = !!mixcloudUrl;

  // Generate the correct link path
  const href = isRadio ? '/radios/[slug]' : '/posts/[slug]';
  const as = isRadio
    ? `/radios/${slug.current || slug}`
    : `/posts/${slug.current || slug}`;
  const blurDataURL = source?.asset?.metadata?.lqip;

  // TODO: BlurDataURL warning, make blur work :( )
  const image = source ? (
    <div
      className="thumbnail-border thumbnail-drop-shadow"
      style={{ overflow: 'hidden' }}>
      {/* <motion.div whileHover={{ scale: 1.1 }} transition={transition}> */}
      <div>
        <Image
          {...imageProps}
          unoptimized
          alt={`Thumbnail for ${title}`}
          placeholder={blurDataURL ? 'blur' : 'empty'}
          blurDataURL={blurDataURL}
          // check for responsive option..
          // sizes={`${width}px, ${height}px`}
          sizes="(max-width: 800px) 100vw, 800px"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
      {/* </motion.div> */}
    </div>
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  );
  return (
    <div>
      {slug ? (
        <Link as={as} href={href} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default Thumbnail;
