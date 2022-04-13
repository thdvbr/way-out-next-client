/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import {
  stuffWeLikeQuery,
  bottomAdQuery,
  pageQuery,
  staffQuery,
} from '../utils/queries';
import { Container, MasonryGrid, Layout } from '../components';
import { useAppContext } from '../context/state';

export const StuffWeLike = ({
  allPosts,
  preview,
  bottomAds,
  staffs,
  pages,
}) => {
  const { setStaffsData, setPagesData } = useAppContext();

  useEffect(() => {
    setStaffsData(staffs);
    setPagesData(pages);
  }, [staffs, pages, setStaffsData, setPagesData]);
  return (
    <>
      <Layout preview={preview} bottomAds={bottomAds}>
        <Container>
          {allPosts && <MasonryGrid type="stuffWeLike" data={allPosts} />}
        </Container>
      </Layout>
    </>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const allPosts = overlayDrafts(
    await getClient(preview).fetch(stuffWeLikeQuery)
  );
  const bottomAds = await getClient(preview).fetch(bottomAdQuery);
  const pages = await getClient(preview).fetch(pageQuery);
  const staffs = await getClient(preview).fetch(staffQuery);
  return {
    props: { allPosts, preview, bottomAds, pages, staffs },
    revalidate: 10,
  };
};

export default StuffWeLike;
