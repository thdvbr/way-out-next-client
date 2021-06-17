import React from 'react';
import Head from 'next/head';
import {
  Breakpoint,
  BreakpointProvider,
} from 'react-socks';
import { useAppContext } from '../context/state';
import {
  Container,
  NavbarMobile,
  MasonryGrid,
  Layout,
  NavbarDesktop,
} from '../components';

export const Search = () => {
  const { searchResult } = useAppContext();
  return (
    <>
      <BreakpointProvider>
        <Layout>
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
                posts={searchResult}
              />
            </Breakpoint>
            <Breakpoint s up>
              <NavbarDesktop />
              <MasonryGrid
                posts={searchResult}
              />
            </Breakpoint>
          </Container>
        </Layout>
      </BreakpointProvider>
    </>
  );
};


export default Search;
