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
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
