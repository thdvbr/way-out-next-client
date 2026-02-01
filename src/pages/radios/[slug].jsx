import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import useWindowWidth from '../../utils/useWindowWidth';
import {
  RadioLayout,
  ThemeWrapper,
  Footer,
  Thumbnail,
  Tracklist,
  Tags,
} from '../../components';

import { sanityClient, getClient } from '../../utils/sanity.server';
import { radioQuery, radioSlugsQuery } from '../../utils/queries';
import { usePreviewSubscription } from '../../utils/sanity';

// 1. skeleton, layout
// 2. bring the data in
// 3. feed the data in
// 4. state
// 5. desktop / mobile?

// const radioFields = `
//   _id,
//   title,
//   subtitle,
//   slug,
//   heroImage,
//   mixcloudUrl,
//   tracklist,
// publishedAt,
//   description,
//   tags `;

function Radio({ data = {}, preview }) {
  const router = useRouter();
  const slug = data?.radio?.slug;
  const { data: previewData } = usePreviewSubscription(radioQuery, {
    params: { slug },
    initialData: data.radio,
    enabled: preview && !!slug,
  });
  const width = useWindowWidth();
  // !!slug === true only if slug exists
  // choose the source of truth
  const radio = preview ? previewData : data.radio;
  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <ThemeWrapper theme="dark">
      <RadioLayout theme="dark" preview={preview} url={radio.mixcloudUrl}>
        <div
          className="flex flex-col gap-8 md:flex-row"
          style={width >= 768 ? { height: '400px' } : {}}>
          {/* TODO: Calculate height for this container you need fixed heigh  */}

          {/* Right Section- Thumbnail - first on mobile, second on desktop*/}
          <section className="flex-shrink-0 w-full bg-pink-500 md:w-1/2 md:order-2">
            <Thumbnail slug="" image={radio.heroImage} />
          </section>
          {/* Left Section */}
          {/* Content Section - second on mobile, first on desktop */}
          <section className="flex flex-col flex-1 w-full min-h-0 md:w-1/2 md:order-1">
            {/* Fixed Metadata */}
            <div className="flex-shrink-0 bg-blue-700">
              <div className="mb-4">{radio.publishedAt}</div>
              <h1 className="mb-2 text-4xl">{radio.title}</h1>
              <h2 className="mb-4 text-xl">{radio.subtitle}</h2>
              {radio.tags && (
                <div className="hidden mb-4 md:block">
                  <Tags tags={radio.tags} />
                </div>
              )}
              ;
              <hr className="mb-6 border-white" />
            </div>
            {/* Play Button - separate on mobile, side-by-side on desktop */}
            <div className="flex-shrink-0 mb-6 md:hidden">
              <button className="w-full py-3 text-black bg-white">play</button>
            </div>
            {/* Tags - Visible on mobile */}
            {radio.tags && (
              <div className="md:hidden">
                <Tags tags={radio.tags} />
              </div>
            )}

            {/* Description - separate on mobile */}
            <div className="flex-shrink-0 mb-6 md:hidden">
              <p>{radio.description}</p>
              <hr className="mt-6 border-white" />
            </div>

            {/* Scrollable Container - contains play+description on desktop, 
            only tracklist on mobile */}
            <div className="flex-1 overflow-y-auto bg-green-500">
              {/* Play Button + Description Side by Side - DESKTOP ONLY */}
              <div className="flex hidden gap-6 mb-6 md:flex">
                <button className="px-6 py-3 text-black bg-white whitespace-nowrap h-fit">
                  play
                </button>

                <div className="flex-1">
                  <p>{radio.description}</p>
                </div>
              </div>
              <hr className="my-6 border-white" />
              {/* Tracklist - scrollable on both */}

              <div className="space-y-4">
                {radio.tracklist && <Tracklist tracklist={radio.tracklist} />}
              </div>
            </div>
          </section>
        </div>

        {/* Sticky Player
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black border-t border-white">
          sticky player
        </div> */}
      </RadioLayout>
    </ThemeWrapper>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const radio = await getClient(preview).fetch(radioQuery, {
    slug: params.slug,
  });
  if (!radio) {
    return { notFound: true };
  }

  return {
    props: {
      preview,
      data: { radio },
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(radioSlugsQuery);
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}
export default Radio;
