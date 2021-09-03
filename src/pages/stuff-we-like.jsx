/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import { stuffWeLikeQuery } from '../utils/queries';
import { Container, MasonryGrid, Layout } from '../components';
import { useAppContext } from '../context/state';

export const StuffWeLike = ({ allPosts, preview }) => {
  const {
    query,
    searchResult,
    searchIsOpen,
    setSearchIsOpen,
    setQuery,
    setSearchResult,
  } = useAppContext();

  useEffect(() => {
    return searchIsOpen && setSearchIsOpen(false);
  }, []);

  useEffect(() => {
    return searchResult && setQuery('') && setSearchResult([]);
  }, []);
  return (
    <>
      <Layout preview={preview}>
        <Container>
          {allPosts && <MasonryGrid posts={!query ? allPosts : searchResult} />}
        </Container>
      </Layout>
    </>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const allPosts = overlayDrafts(
    await getClient(preview).fetch(stuffWeLikeQuery),
  );
  return {
    props: { allPosts, preview },
  };
};

export default StuffWeLike;
