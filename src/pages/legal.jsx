import React, { useEffect } from 'react';
import { Container, Layout, Content } from '../components';
import { useAppContext } from '../context/state';

export const Legal = ({ preview }) => {
  const { setInfoIsOpen, pageData } = useAppContext();
  const { legal } = pageData;
  useEffect(() => {
    setInfoIsOpen(false);
  }, [setInfoIsOpen]);
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

// export const getStaticProps = async ({ preview = false }) => {
//   // const pages = await getClient(preview).fetch(pageQuery);
//   // const staffs = await getClient(preview).fetch(staffQuery);
//   return {
//     props: { preview },
//     revalidate: 10,
//   };
// };

export default Legal;
