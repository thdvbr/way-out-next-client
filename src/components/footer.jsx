import React from 'react';
import Link from 'next/link';
import { renderToStaticMarkup } from 'react-dom/server';
import FooterSvg from './footer-svg';
import useWindowWidth from '../utils/useWindowWidth';

export default function Footer() {
  const width = useWindowWidth();
  const svgString = encodeURIComponent(renderToStaticMarkup(<FooterSvg />));
  return (
    <footer style={{ transform: 'translateY(60px)', backgroundImage: `url("data:image/svg+xml,${svgString}")`, }}>
      <nav
        className="container px-3 py-2 mx-auto text-white sm:px-14 md:px-36 ml:px-72 lg:px-80 xl:px-96 text-13 sm:text-15 ml:text-16 xl:text-18 font-agrandir">
        <div className="flex flex-row items-center justify-between">
          <a className="hover:underline" href="mailto:info@wayoutmagazine.com">
            Contact
          </a>
          <a className="hover:underline" href="mailto:info@wayoutmagazine.com">
            Donate
          </a>
          {width > 499 && (
            <Link href="/">

              <div className="footer-logo-container" />

            </Link>
          )}
          <Link href="/legal" className="hover:underline">
            
              Legal
            
          </Link>
          <a className="hover:underline" href="mailto:ads@wayoutmagazine.com">
            Advertise
          </a>
        </div>
      </nav>
    </footer>
  );
}
