import React, { useEffect } from 'react';
import { Container, Layout } from '../components';
import { useAppContext } from '../context/state';

export const Radio = ({ preview }) => {
  const { setInfoIsOpen } = useAppContext();
  useEffect(() => {
    setInfoIsOpen(false);
  }, [setInfoIsOpen]);
  return (
    <>
      <Layout preview={preview}>
        <Container>
          <div className="mt-4 mx-4 radio-placeholder h-screen font-main text-30" />
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

export default Radio;
