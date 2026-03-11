import React from 'react';
import { Container, SearchResult, Layout } from '../components';
import { getClient } from '../utils/sanity.server';
import {
  pageQuery,
  staffQuery,
  bottomAdQuery,
  sideAdQuery,
} from '../utils/queries';

export const Search = ({ preview }) => {
  return (
    <>
      <Layout preview={preview}>
        <Container>
          <SearchResult />
        </Container>
      </Layout>
    </>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const bottomAds = await getClient(preview).fetch(bottomAdQuery);
  const pageData = await getClient(preview).fetch(pageQuery);
  const staffData = await getClient(preview).fetch(staffQuery);
  const sideAds = await getClient(preview).fetch(sideAdQuery);
  return {
    props: {
      preview,
      pageData,
      staffData,
      bottomAds,
      sideAds,
    },
    revalidate: 86400,
  };
};

export default Search;
