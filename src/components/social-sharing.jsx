import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
} from 'next-share';

const SocialSharing = ({ slug }) => {
  return (
    <div className="font-title text-14 ml:text-16 xl:text-20 text-center flex justify-center">
      <div className="mr-8 md:mr-12">
        <FacebookShareButton
          url={`https://way-out-next-client.vercel.app/posts/${slug}`}
        >
          <u>Facebook</u>
        </FacebookShareButton>
      </div>
      <div className="mr-8 md:mr-12">
        <TwitterShareButton
          url={`https://way-out-next-client.vercel.app/posts/${slug}`}
        >
          <u>Twitter</u>
        </TwitterShareButton>
      </div>
      <div>
        <EmailShareButton
          url={`https://way-out-next-client.vercel.app/posts/${slug}`}
        >
          <u>Email</u>
        </EmailShareButton>
      </div>
    </div>
  );
};

export default SocialSharing;
