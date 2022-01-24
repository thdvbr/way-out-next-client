/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import ErrorPage from 'next/error';
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
} from '../../utils/queries';
import { usePreviewSubscription } from '../../utils/sanity';
import {
  PostHeader,
  PostBody,
  PostLayout,
  ArtistLink,
  RelatedGrid,
} from '../../components';
import { useAppContext } from '../../context/state';

export const Post = ({ data = {}, preview }) => {
  const easing = [0.3, 0.85, 0.42, 0.96];
  const postHeaderVariants = {
    hidden: { opacity: 0 },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { delay: 0.1, duration: 1, ease: easing },
    },
    exit: { opacity: 0, x: 0, y: -100 },
  };

  const postBodyVariants = {
    hidden: { opacity: 0 },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { delay: 0.3, duration: 1, ease: easing },
    },
    exit: { opacity: 0, x: 0, y: -100 },
  };

  const morePostVariants = {
    initial: { y: 60, opacity: 0 },
    enter: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.4, duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
    },
    exit: {
      y: 100,
      opacity: 0,
      transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
    },
  };

  // TODO: dont think this stagger works
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const router = useRouter();
  const slug = data?.post?.slug;
  const {
    data: { post, morePosts, staffs, pages },
  } = usePreviewSubscription(postQuery, {
    params: { slug },
    initialData: data,
    enabled: preview && slug,
  });
  const {
    setQuery,
    searchResult,
    setSearchResult,
    searchIsOpen,
    setSearchIsOpen,
    isTop,
    setIsTop,
    setStaffsData,
    setPagesData,
    setJoinIsOpen,
  } = useAppContext();

  useEffect(() => {
    setStaffsData(staffs);
    setPagesData(pages);
  }, [staffs, pages, setStaffsData, setPagesData]);

  useEffect(() => {
    return searchIsOpen && setSearchIsOpen(false);
  }, []);

  // flushing state. do we need this?
  useEffect(() => {
    return searchResult && setQuery('') && setSearchResult([]);
  }, []);

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
                  className="xl:px-36 lg:px-28 md:px-24 px-2">
                  <PostBody body={post.body} />
                </motion.div>
                {post.artistLink && <ArtistLink artistLink={post.artistLink} />}
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
    </motion.div>
  );
};

export async function getStaticProps({ params, preview = false }) {
  const { post, morePosts } = await getClient(preview).fetch(postQuery, {
    slug: params.slug,
  });
  const pages = await getClient(preview).fetch(pageQuery);
  const staffs = await getClient(preview).fetch(staffQuery);

  return {
    props: {
      preview,
      data: {
        post,
        morePosts: overlayDrafts(morePosts),
        staffs,
        pages,
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
