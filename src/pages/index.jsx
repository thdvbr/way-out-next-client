import React, { useState } from 'react';
import Head from 'next/head';
import {
  setDefaultBreakpoints,
  Breakpoint,
  BreakpointProvider,
} from 'react-socks';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import { indexQuery } from '../utils/queries';
import {
  Container,
  HeroPost,
  NavbarMobile,
  MasonryGrid,
  Layout,
  NavbarDesktop,
  SearchBar,
} from '../components';

setDefaultBreakpoints([
  { xs: 0 },
  { s: 500 },
  { m: 768 },
  { l: 1366 },
  { xl: 1920 },
]);

export const Index = ({ allPosts, preview }) => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const searchEndpoint = (searchQuery) => `/api/search?q=${searchQuery}`;

  const handleSearch = (query) => {
    setQuery(query);
    if (query.length) {
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => setSearchResult(res.results));
    } else {
      setSearchResult([]);
    }
  };

  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
      <BreakpointProvider>
        <Layout preview={preview}>
          <Head>
            <title>Way Out Mag</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Container>
            <Breakpoint xs only>
              <NavbarMobile />
              <MasonryGrid
                posts={!searchResult.length ? allPosts : searchResult}
              />
            </Breakpoint>
            <Breakpoint s up>
              <NavbarDesktop />
              <SearchBar onSearch={handleSearch} />
              {!query.length && heroPost && (
                <HeroPost
                  title={heroPost.title}
                  subtitle={heroPost.subtitle}
                  mainImage={heroPost.mainImage}
                  slug={heroPost.slug}
                />
              )}
              <MasonryGrid
                posts={
                  !query.length && morePosts ? morePosts : searchResult
                }
              />
            </Breakpoint>
          </Container>
        </Layout>
      </BreakpointProvider>
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
