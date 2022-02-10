import React from 'react';
import { Container, SearchResult, Layout } from '../components';
import { getClient } from '../utils/sanity.server';
import { bottomAdQuery } from '../utils/queries';

export const Search = ({ preview, bottomAds }) => {
  return (
    <>
      <Layout preview={preview} bottomAds={bottomAds}>
        <Container>
          <SearchResult />
        </Container>
      </Layout>
    </>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const bottomAds = await getClient(preview).fetch(bottomAdQuery);
  return {
    props: { bottomAds, preview },
  };
};

export default Search;
