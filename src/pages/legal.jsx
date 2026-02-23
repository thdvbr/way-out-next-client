import React, { useEffect } from 'react';
import { Container, Layout, Content, PageTransition } from '../components';
import { useUIContext } from '../context/ui-context';
import { useDataContext } from '../context/data-context';
import { getClient } from '../utils/sanity.server';
import {
  pageQuery,
  staffQuery,
  bottomAdQuery,
  sideAdQuery,
} from '../utils/queries';
export const Legal = ({ preview }) => {
  const { setInfoIsOpen } = useUIContext();
  const { pageData } = useDataContext();
  const { legal } = pageData;
  useEffect(() => {
    setInfoIsOpen(false);
  }, [setInfoIsOpen]);
  return (
    <>
      <PageTransition>
        <Layout preview={preview} showBottomAd={false}>
          <Container>
            <div className="mt-12 text-center font-main text-30 md:text-33 lg:text-43">
              Terms & Conditions
            </div>
            <div className="px-8 lg:px-24 md:px-28">
              <Content body={legal.body} />
            </div>
          </Container>
        </Layout>
      </PageTransition>
    </>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const pageData = await getClient(preview).fetch(pageQuery);
  const staffData = await getClient(preview).fetch(staffQuery);
  const bottomAds = await getClient(preview).fetch(bottomAdQuery);
  const sideAds = await getClient(preview).fetch(sideAdQuery);
  return {
    props: {
      preview,
      pageData,
      staffData,
      bottomAds,
      sideAds,
    },
    revalidate: 10,
  };
};

export default Legal;
