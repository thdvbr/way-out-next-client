import React from 'react';
import AlertPreview from './alert-preview';
import Footer from './footer';
import Meta from './meta';

export default function Layout({ preview, children }) {
  return (
    <>
      {/* <Meta /> */}
      <div className="min-h-screen">
        { preview && <AlertPreview /> }
        <main className="mx-5 sm:mx-8 md:mx-10 lg:mx-20 xl:mx-24">{children}</main>
      </div>
      <Footer />
    </>
  );
}
