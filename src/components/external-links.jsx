/* eslint-disable */
import React from 'react';

const ExternalLinks = ({ externalLinks }) => {
  return (
    <div className="xl:text-22.5 xl:leading-7 text-center tracking-wider">
      <div className="font-agrandir text-14 ml:text-18 xl:text-24 xl:leading-8">
        {externalLinks.map((link, index) => (
          <div key={index}>
            {link.label}:{' '}
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gold">
              {link.displayText}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ExternalLinks;
