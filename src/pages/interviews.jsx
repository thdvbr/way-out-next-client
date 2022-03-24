/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import {
  interviewsQuery,
  bottomAdQuery,
  pageQuery,
  staffQuery,
} from '../utils/queries';
import { Container, MasonryGrid, Layout } from '../components';
import { useAppContext } from '../context/state';

// how to handle page redirect after search?
// should search on interview page only search inside of interviews?

export const Interviews = ({ allPosts, preview, bottomAds, staffs, pages }) => {
  const { setStaffsData, setPagesData } = useAppContext();

  useEffect(() => {
    setStaffsData(staffs);
    setPagesData(pages);
  }, [staffs, pages, setStaffsData, setPagesData]);

  return (
    <>
      <Layout preview={preview} bottomAds={bottomAds}>
        <Container>
          {allPosts && <MasonryGrid type="interviews" data={allPosts} />}
        </Container>
      </Layout>
    </>
  );
};

// TODO: Think about what to do with staffs and pages fetching on interviews/ stuff-we-like.

export const getStaticProps = async ({ preview = false }) => {
  const allPosts = overlayDrafts(
    await getClient(preview).fetch(interviewsQuery)
  );
  const pages = await getClient(preview).fetch(pageQuery);
  const staffs = await getClient(preview).fetch(staffQuery);
  const bottomAds = await getClient(preview).fetch(bottomAdQuery);
  return {
    props: { allPosts, preview, bottomAds, pages, staffs },
    revalidate : 10
  };
};

export default Interviews;
