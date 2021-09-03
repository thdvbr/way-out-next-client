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
import { postQuery, postSlugsQuery } from '../../utils/queries';
import { usePreviewSubscription } from '../../utils/sanity';
import {
  PostHeader,
  PostBody,
  PostLayout,
  ArtistLink,
  RelatedGrid,
  Container,
  SectionSeparator,
} from '../../components';
import { useAppContext } from '../../context/state';

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
  const {
    setQuery,
    searchResult,
    setSearchResult,
    searchIsOpen,
    setSearchIsOpen,
    isTop,
    setIsTop,
  } = useAppContext();
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
      }
    });
  });


  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      <motion.div initial="exit" animate="enter" exit="exit">
        <PostLayout preview={preview}>
          <Container>
            {post && (
              <>
                {/* <SectionSeparator /> */}
                <article>
                  <PostHeader
                    title={post.title}
                    subtitle={post.subtitle}
                    mainImage={post.mainImage}
                    subCategory={post.subCategory}
                    publishedAt={post.publishedAt}
                    credits={post.credits}
                  />
                  <div className="xl:px-60 lg:px-40 md:px-24 px-2">
                    <PostBody body={post.body} />
                  </div>
                  {post.artistLink && (
                    <ArtistLink artistLink={post.artistLink} />
                  )}
                </article>
              </>
            )}
            {morePosts && <RelatedGrid posts={morePosts} />}
          </Container>
        </PostLayout>
      </motion.div>
    </>
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
