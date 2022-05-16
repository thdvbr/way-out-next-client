import React from 'react';
import Link from 'next/link';
import { renderToStaticMarkup } from 'react-dom/server';
import FooterSvg from './footer-svg';
import { useCurrentWidth } from 'react-socks';

export default function Footer() {
  const width = useCurrentWidth();
  const svgString = encodeURIComponent(renderToStaticMarkup(<FooterSvg />));
  return (
    <footer style={{ transform: 'translateY(60px)' }}>
      <nav
        className="text-white py-2 px-3 sm:px-24 md:px-56 ml:px-80 lg:px-26rem xl:px-36rem xl:text-18 text-13 sm:text-15 ml:text-16 font-agrandir"
        style={{
          backgroundImage: `url("data:image/svg+xml,${svgString}")`,
        }}>
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
          <a className="hover:underline" href="mailto:info@wayoutmagazine.com">
            Advertise
          </a>
        </div>
      </nav>
    </footer>
  );
}
