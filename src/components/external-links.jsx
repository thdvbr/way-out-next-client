/* eslint-disable */
import React from 'react';

const ExternalLinks = ({ externalLinks }) => {
  return (
    <div className="xl:text-22.5 xl:leading-7 text-center my-12 tracking-wider">
      <p className="font-secondary mb-3 font-extrabold text-16 ml:text-20 xl:text-26.5 xl:leading-8">
        Connect here
      </p>
      <div className="font-agrandir text-14 ml:text-18 xl:text-24 xl:leading-8">
        {externalLinks.map((link, index) => (
          <div key={index}>
            {link.label}:{' '}
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-70">
              {link.url}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ExternalLinks;
