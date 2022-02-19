/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ErrorPage from 'next/error';
import _ from 'lodash';
import { useCurrentWidth } from 'react-socks';
import {
  sanityClient,
  getClient,
  overlayDrafts,
} from '../../utils/sanity.server';
import {
  postQuery,
  postSlugsQuery,
  pageQuery,
  staffQuery,
  sideAdQuery,
  bottomAdQuery,
} from '../../utils/queries';
import { usePreviewSubscription } from '../../utils/sanity';
import {
  PostHeader,
  PostBody,
  PostLayout,
  ArtistLink,
  RelatedGrid,
  BottomAdImage,
  SocialSharing
} from '../../components';
import { useAppContext } from '../../context/state';
import {
  postHeaderVariants,
  postBodyVariants,
  morePostVariants,
  stagger,
  adVariants,
} from '../../utils/animation';

export const Post = ({ data = {}, preview }) => {
  const router = useRouter();
  const slug = data?.post?.slug;
  const {
    data: { post, morePosts, staffs, pages, sideAds, bottomAds },
  } = usePreviewSubscription(postQuery, {
    params: { slug },
    initialData: data,
    enabled: preview && slug,
  });
  const {
    isTop,
    setIsTop,
    setStaffsData,
    setPagesData,
    setJoinIsOpen,
  } = useAppContext();

  const { ref, inView } = useInView();
  const animation = useAnimation();
  const randomSlice1 = _.sample(bottomAds);
  const width = useCurrentWidth();

  useEffect(() => {
    if (inView) {
      animation.start('visible');
    }
    if (!inView) {
      animation.start('hidden');
    }
  }, [inView]);

  useEffect(() => {
    setStaffsData(staffs);
    setPagesData(pages);
  }, [staffs, pages, setStaffsData, setPagesData]);

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
      if (isTop !== isOnTop) {
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
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
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
                  className="xl:px-36 lg:px-28 md:px-24 sm:px-20 px-2">
                  <PostBody body={post.body} ads={sideAds} />
                  {post.artistLink && <ArtistLink artistLink={post.artistLink} />}
                  <SocialSharing slug={slug}/>
                </motion.div>
              </article>
            </>
          )}
          <motion.div variants={stagger}>
            {morePosts && (
              <motion.div
                variants={morePostVariants}
                initial="initial"
                animate="enter"
                exit="exit">
                <RelatedGrid posts={morePosts} />
              </motion.div>
            )}
          </motion.div>
        </div>
      </PostLayout>
      {bottomAds && (
        <motion.div
          className="px-3 mb-16 sm:px-6 md:px-10 ml:px-16 lg:px-20 flex justify-center"
          ref={ref}
          animate={animation}
          variants={adVariants}
          initial="hidden">
          {width > 500 ? (
            <BottomAdImage
              image={randomSlice1.adImage}
              url={randomSlice1.adUrl}
              width={1360}
            />
          ) : (
            <BottomAdImage
              image={randomSlice1.adImageMobile}
              url={randomSlice1.adUrl}
              width={500}
            />
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export async function getStaticProps({ params, preview = false }) {
  const { post, morePosts } = await getClient(preview).fetch(postQuery, {
    slug: params.slug,
  });
  const pages = await getClient(preview).fetch(pageQuery);
  const staffs = await getClient(preview).fetch(staffQuery);
  const sideAds = await getClient(preview).fetch(sideAdQuery);
  const bottomAds = await getClient(preview).fetch(bottomAdQuery);

  return {
    props: {
      preview,
      data: {
        post,
        morePosts: overlayDrafts(morePosts),
        staffs,
        pages,
        sideAds,
        bottomAds,
      },
    },
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
