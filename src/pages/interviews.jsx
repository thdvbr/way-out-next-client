/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import { interviewsQuery, bottomAdQuery, } from '../utils/queries';
import { Container, MasonryGrid, Layout } from '../components';
import { useAppContext } from '../context/state';

// how to handle page redirect after search?
// should search on interview page only search inside of interviews?


export const Interviews = ({ allPosts, preview, bottomAds }) => {
  return (
    <>
      <Layout preview={preview} bottomAds={bottomAds}>
        <Container>
          {allPosts && <MasonryGrid type="interviews" data={allPosts} />}
          {/* <div className="font-title flex justify-center text-24">
            {isLoading && <span>... Loading</span>}
            {errorMsg && <span>{errorMsg}</span>}
          </div> */}
        </Container>
      </Layout>
    </>
  );
};

// TODO: Think about what to do with staffs and pages fetching on interviews/ stuff-we-like.

export const getStaticProps = async ({ preview = false }) => {
  const allPosts = overlayDrafts(
    await getClient(preview).fetch(interviewsQuery),
    
  );
  const bottomAds = await getClient(preview).fetch(bottomAdQuery);
  return {
    props: { allPosts, preview, bottomAds },
  };
};

export default Interviews;
