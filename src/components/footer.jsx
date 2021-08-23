import React from 'react';
import Link from 'next/link';
import FooterSvg from './footer-svg';
import { renderToStaticMarkup } from "react-dom/server";
import { useAppContext } from '../context/state';

export default function Footer() {
  const {
    infoIsOpen, setInfoIsOpen,
  } = useAppContext();
  const svgString = encodeURIComponent(renderToStaticMarkup(<FooterSvg />));
  return (
    <footer>
      <nav
        className="flex flex-row text-white py-5 xl:text-15 text-12 font-title"
        style={{
          backgroundImage: `url("data:image/svg+xml,${svgString}")`,
        }}>
        <div className="w-1/3 flex flex-row justify-evenly items-center underline">
          <Link href="/interviews">
            <a href="/interviews">
              Interviews
            </a>
          </Link>
          <Link href="/stuff-we-like">
            <a href="/stuff-we-like">
              <span className="">Stuff We Like</span>
            </a>
          </Link>
          <Link href="/">
            <a href="/radio">
              <span>Radio</span>
            </a>
          </Link>
          <button
            type="button"
            onClick={() => setInfoIsOpen(!infoIsOpen)}>
            <span>Info</span>
          </button>
        </div>
        <div className="w-1/3">join our newsletter</div>
        <div className="w-1/3">logo</div>
      </nav>
    </footer>
  );
}
