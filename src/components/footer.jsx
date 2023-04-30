import React from 'react';
import Link from 'next/link';
import { renderToStaticMarkup } from 'react-dom/server';
import FooterSvg from './footer-svg';
import { useCurrentWidth } from 'react-socks';

export default function Footer() {
  const width = useCurrentWidth();
  const svgString = encodeURIComponent(renderToStaticMarkup(<FooterSvg />));
  return (
    <footer style={{ transform: 'translateY(60px)', backgroundImage: `url("data:image/svg+xml,${svgString}")`, }}>
      <nav
        className="container mx-auto text-white py-2 px-3 sm:px-14 md:px-36 ml:px-72 lg:px-80 xl:px-96 text-13 sm:text-15 ml:text-16 xl:text-18 font-agrandir">
        <div className="flex flex-row justify-between items-center">
          <a className="hover:underline" href="mailto:info@wayoutmagazine.com">
            Contact
          </a>
          <a className="hover:underline" href="mailto:info@wayoutmagazine.com">
            Donate
          </a>
          {width > 499 && (
            <Link href="/">
              <a href="/">
                <div className="footer-logo-container" />
              </a>
            </Link>
          )}
          <Link href="/legal">
            <a className="hover:underline" href="/legal">
              Legal
            </a>
          </Link>
          <a className="hover:underline" href="mailto:ads@wayoutmagazine.com">
            Advertise
          </a>
        </div>
      </nav>
    </footer>
  );
}
