/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import { interviewsQuery } from '../utils/queries';
import { Container, MasonryGrid, Layout } from '../components';
import { useAppContext } from '../context/state';

// how to handle page redirect after search?
// should search on interview page only search inside of interviews?

export const Interviews = ({ allPosts, preview }) => {
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

  // flushing state. do we need this?
  useEffect(() => {
    return searchResult && setQuery('') && setSearchResult([]);
  }, []);

  return (
    <>
      <Layout preview={preview}>
        <Container>
          {allPosts && <MasonryGrid posts={!query ? allPosts : searchResult} />}
          {/* <div className="font-title flex justify-center text-24">
            {isLoading && <span>... Loading</span>}
            {errorMsg && <span>{errorMsg}</span>}
          </div> */}
        </Container>
      </Layout>
    </>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const allPosts = overlayDrafts(
    await getClient(preview).fetch(interviewsQuery),
  );
  return {
    props: { allPosts, preview },
  };
};

export default Interviews;
