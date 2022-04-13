import React, { useEffect } from 'react';
import { getClient } from '../utils/sanity.server';
import { pageQuery, staffQuery } from '../utils/queries';
import { Container, Layout, Content } from '../components';
import { useAppContext } from '../context/state';

export const Legal = ({ pages, staffs, preview }) => {
  const { setStaffsData, setPagesData, setInfoIsOpen } = useAppContext();
  const { legal } = pages;
  useEffect(() => {
    setStaffsData(staffs);
    setPagesData(pages);
    setInfoIsOpen(false);
  }, [staffs, pages, setStaffsData, setPagesData, setInfoIsOpen]);
  return (
    <>
      <Layout preview={preview}>
        <Container>
          <div className="font-main text-30 md:text-33 lg:text-43 mt-12 text-center">
            Terms & Conditions
          </div>
          <div className="px-8 lg:px-24 md:px-28">
            <Content body={legal.body} />
          </div>
        </Container>
      </Layout>
    </>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const pages = await getClient(preview).fetch(pageQuery);
  const staffs = await getClient(preview).fetch(staffQuery);
  return {
    props: { preview, pages, staffs },
    revalidate: 10,
  };
};

export default Legal;
