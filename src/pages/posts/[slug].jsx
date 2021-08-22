/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Breakpoint, BreakpointProvider } from 'react-socks';
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
  NavbarMobile,
  NavbarDesktop,
  Layout,
  ArtistLink,
  RelatedGrid,
  SectionSeparator,
  InfoDrawerWithoutSSR,
  Container,
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
  } = useAppContext();
  useEffect(() => {
    return searchIsOpen && setSearchIsOpen(false);
  }, []);

  // flushing state. do we need this?
  useEffect(() => {
    return searchResult && setQuery('') && setSearchResult([]);
  }, []);

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      <motion.div initial="exit" animate="enter" exit="exit">
        <BreakpointProvider>
          <Layout preview={preview}>
            <Container>
              <Breakpoint xs only>
                <NavbarMobile />
              </Breakpoint>
              <Breakpoint s up>
                <NavbarDesktop />
                <InfoDrawerWithoutSSR />
                <SectionSeparator />
              </Breakpoint>
              {post && (
                <article>
                  <PostHeader
                    title={post.title}
                    subtitle={post.subtitle}
                    mainImage={post.mainImage}
                    subCategory={post.subCategory}
                    publishedAt={post.publishedAt}
                    credits={post.credits}
                  />
                  <div className="xl:px-60">
                    <PostBody body={post.body} />
                  </div>
                  {post.artistLink && (
                    <ArtistLink artistLink={post.artistLink} />
                  )}
                </article>
              )}
              {morePosts && <RelatedGrid posts={morePosts} />}
            </Container>
          </Layout>
        </BreakpointProvider>
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
