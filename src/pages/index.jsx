import React from 'react';
import { setDefaultBreakpoints, Breakpoint } from 'react-socks';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import { indexQuery, pageQuery, staffQuery } from '../utils/queries';
import { Container, HeroPost, MasonryGrid, Layout } from '../components';
import { useAppContext } from '../context/state';

setDefaultBreakpoints([
  { xs: 0 },
  { s: 500 },
  { m: 768 },
  { l: 1366 },
  { xl: 1536 },
]);

export const Index = ({ allPosts, pages, staffs, preview }) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  const { query, searchResult, isLoading, errorMsg } = useAppContext();
  console.log("staff", staffs);
  // TODO: search result when theres no result?
  // needs to wait until searchResult is returned.
  return (
    <>
      <Layout preview={preview} pages={pages} staffs={staffs}>
        <Container>
          <Breakpoint customQuery="(max-width: 500px)">
            <div>
              <MasonryGrid posts={!query ? allPosts : searchResult} />
            </div>
          </Breakpoint>
          <Breakpoint customQuery="(min-width: 500px)">
            <div>
              {!query && heroPost && (
                <HeroPost
                  title={heroPost.title}
                  subtitle={heroPost.subtitle}
                  mainImage={heroPost.mainImage}
                  slug={heroPost.slug}
                />
              )}
              <MasonryGrid posts={!query ? morePosts : searchResult} />
            </div>
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
  const pages = await getClient(preview).fetch(pageQuery);
  const staffs = await getClient(preview).fetch(staffQuery);
  return {
    props: { allPosts, pages, staffs, preview },
  };
};

export default Index;
