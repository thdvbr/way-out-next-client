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
  objectFit,
  // objectFit = 'cover',
  type,
  mixcloudUrl, // Radio shows have this field
  mainCategory, // Posts have this field
  fillContainer = false,
  priority = false,
}) => {
  const myCustomImageBuilder = (imageUrlBuilder, options) => {
    return imageUrlBuilder
      .width(Math.min(options.width, 800))
      .fit('max')
      .auto('format');
  };

  const imageProps = useNextSanityImage(sanityClient, source || null, {
    blurUpImageWidth: 124,
    blurUpImageQuality: 40,
    blurUpAmount: 200,
    imageBuilder: myCustomImageBuilder,
  });

  if (!source?.asset) {
    return <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />;
  }

  // Determine if this is a radio show or a post
  const isRadio = !!mixcloudUrl || type === 'radio';

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
      style={
        fillContainer
          ? {
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            }
          : {
              overflow: 'hidden', // ← original
            }
      }>
      {/* <motion.div whileHover={{ scale: 1.1 }} transition={transition}> */}
      <div style={fillContainer ? { position: 'absolute', inset: 0 } : {}}>
        <Image
          {...imageProps}
          alt={`Thumbnail for ${title}`}
          placeholder={blurDataURL ? 'blur' : 'empty'}
          blurDataURL={blurDataURL}
          priority={priority}
          // check for responsive option..
          // sizes={`${width}px, ${height}px`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          style={
            fillContainer
              ? {
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }
              : {
                  width: '100%',
                  height: 'auto', // ← original
                }
          }
        />
      </div>
      {/* </motion.div> */}
    </div>
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  );
  return (
    <div style={fillContainer ? { height: '100%' } : {}}>
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
