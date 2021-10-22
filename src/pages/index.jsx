import React from 'react';
import {
  setDefaultBreakpoints,
  Breakpoint,
} from 'react-socks';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import { indexQuery } from '../utils/queries';
import {
  Container, HeroPost, MasonryGrid, Layout,
} from '../components';
import { useAppContext } from '../context/state';

setDefaultBreakpoints([
  { xs: 0 },
  { s: 500 },
  { m: 768 },
  { l: 1366 },
  { xl: 1536 },
]);

export const Index = ({ allPosts, preview }) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  const {
    query, searchResult, isLoading, errorMsg,
  } = useAppContext();
  // TODO: search result when theres no result?
  // needs to wait until searchResult is returned.
  return (
    <>
      <Layout preview={preview}>
        <Container>
          <Breakpoint xs only>
            <div className="px-3">
              <MasonryGrid posts={!query ? allPosts : searchResult} />
            </div>
          </Breakpoint>
          <Breakpoint s up>
            {!query && heroPost && (
              <HeroPost
                title={heroPost.title}
                subtitle={heroPost.subtitle}
                mainImage={heroPost.mainImage}
                slug={heroPost.slug}
              />
            )}
            <MasonryGrid posts={!query ? morePosts : searchResult} />
          </Breakpoint>
          <div className="font-title flex justify-center text-24">
            {isLoading && <span>... Loading</span>}
            {errorMsg && <span>{errorMsg}</span>}
          </div>
        </Container>
      </Layout>
    </>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery));
  return {
    props: { allPosts, preview },
  };
};

export default Index;
