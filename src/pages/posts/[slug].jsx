/* eslint-disable */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { sample, sampleSize } from '../../utils/random';
import ErrorPage from 'next/error';
import {
  sanityClient,
  getClient,
  overlayDrafts,
} from '../../utils/sanity.server';
import { postQuery, postSlugsQuery } from '../../utils/queries';
import { usePreviewSubscription } from '../../utils/sanity';
import {
  PostHeader,
  PostBody,
  PostLayout,
  ExternalLinks,
  RelatedGrid,
  SocialLinks,
} from '../../components';
import { useAppContext } from '../../context/state';
import {
  postHeaderVariants,
  postBodyVariants,
  morePostVariants,
  stagger,
} from '../../utils/animation';
import useWindowWidth from '../../utils/useWindowWidth';

export const Post = ({ data = {}, preview }) => {
  const router = useRouter();
  const slug = data?.post?.slug;
  const {
    data: { post, morePosts },
  } = usePreviewSubscription(postQuery, {
    params: { slug },
    initialData: data,
    enabled: preview && slug,
  });
  const { isTop, setIsTop, setJoinIsOpen, bottomAdData, sideAdData } =
    useAppContext();

  const { inView } = useInView();
  const animation = useAnimation();
  // const randomSlice1 = sample(bottomAdData);

  const width = useWindowWidth();
  const [randomSlicedMorePosts, setRandomSlicedMorePosts] = useState([]);
  // const [randomSliceBottomAd, setRandomSliceBottomAd] = useState(null);
  const [randomSliced2SideAds, setRandomSliced2SideAds] = useState([]);
  const [randomSliced1SideAd, setRandomSliced1SideAd] = useState(null);

  useEffect(() => {
    if (inView) {
      animation.start('visible');
    }
    if (!inView) {
      animation.start('hidden');
    }
  }, [inView]);

  const randomize = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    setRandomSlicedMorePosts(randomize(morePosts || []).slice(1, 5));
    setRandomSliced2SideAds(sampleSize(sideAdData || [], 2));
    setRandomSliced1SideAd(sample(sideAdData || null));
  }, [router.asPath]);

  // useEffect(() => {
  //   return searchIsOpen && setSearchIsOpen(false);
  // }, []);

  // // flushing state. do we need this?
  // useEffect(() => {
  //   return searchResult && setQuery('') && setSearchResult([]);
  // }, []);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      const isOnTop = window.scrollY > 100;
      if (isTop !== isOnTop && !preview) {
        setIsTop(isOnTop);
        setJoinIsOpen(false);
      }
    });
  });

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <motion.div
      // ref={listInnerRef}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}>
      <PostLayout preview={preview}>
        <div className="px-3">
          {post && (
            <>
              {/* <SectionSeparator /> */}
              <article>
                <motion.div
                  variants={postHeaderVariants}
                  initial="hidden"
                  animate="enter"
                  exit="exit">
                  <PostHeader
                    title={post.title}
                    subtitle={post.subtitle}
                    mainImage={post.mainImage}
                    subCategory={post.subCategory}
                    publishedAt={post.publishedAt}
                    credits={post.credits}
                  />
                </motion.div>
                <motion.div
                  variants={postBodyVariants}
                  initial="hidden"
                  animate="enter"
                  exit="exit"
                  className="px-2 lg:px-28 md:px-24 sm:px-20">
                  <PostBody
                    body={post.body}
                    adShortPost={randomSliced1SideAd}
                    adLongPost={randomSliced2SideAds}
                  />
                  {post.externalLinks && (
                    <ExternalLinks externalLinks={post.externalLinks} />
                  )}
                  <SocialLinks socialLinks={post.socialLinks} />
                </motion.div>
              </article>
            </>
          )}
          <motion.div variants={stagger}>
            {randomSlicedMorePosts && (
              <motion.div
                variants={morePostVariants}
                initial="initial"
                animate="enter"
                exit="exit">
                <RelatedGrid posts={randomSlicedMorePosts} />
              </motion.div>
            )}
          </motion.div>
        </div>
      </PostLayout>
    </motion.div>
  );
};

export async function getStaticProps({ params, preview = false }) {
  const { post, morePosts } = await getClient(preview).fetch(postQuery, {
    slug: params.slug,
  });

  return {
    props: {
      preview,
      data: {
        post,
        morePosts: overlayDrafts(morePosts),
      },
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(postSlugsQuery);
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export default Post;
