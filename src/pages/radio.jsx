import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Layout,
  RadioGrid,
  ThemeWrapper,
  PageTransition,
} from '../components';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import {
  radioShowsQuery,
  pageQuery,
  staffQuery,
  bottomAdQuery,
  sideAdQuery,
} from '../utils/queries';
import { useUIContext } from '../context/ui-context';

export const Radio = ({ allRadioShows, preview, bottomAds }) => {
  const router = useRouter();
  const { setErrorMsg } = useUIContext();

  useEffect(() => {
    setErrorMsg('');
  }, [router.asPath]);
  return (
    <>
      <ThemeWrapper theme="dark">
        <PageTransition>
          <Layout
            preview={preview}
            bottomAds={bottomAds}
            theme="dark"
            showBottomAd={false}
            title="Radio — Way Out Mag">
            <Container>
              {allRadioShows && <RadioGrid data={allRadioShows} />}
            </Container>
          </Layout>
        </PageTransition>
      </ThemeWrapper>
    </>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const allRadioShows = overlayDrafts(
    await getClient(preview).fetch(radioShowsQuery),
  );

  const pageData = await getClient(preview).fetch(pageQuery);
  const staffData = await getClient(preview).fetch(staffQuery);
  const bottomAds = await getClient(preview).fetch(bottomAdQuery);
  const sideAds = await getClient(preview).fetch(sideAdQuery);
  return {
    props: {
      allRadioShows,
      preview,
      pageData,
      staffData,
      bottomAds,
      sideAds,
    },
    revalidate: 86400,
  };
};

export default Radio;
