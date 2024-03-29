import dynamic from 'next/dynamic';
import AlertPreview from './alert-preview';
import ArtistLink from './artist-link';
import Container from './container';
import Date from './date';
import Footer from './footer';
import HeroPost from './hero-post';
import Layout from './layout';
import PostLayout from './post-layout';
import MainImage from './main-image';
import MasonryGrid from './masonry-grid';
import Meta from './meta';
import PostBody from './post-body';
import PostHeader from './post-header';
import RelatedItem from './related-item';
import PostSubtitle from './post-subtitle';
import PostTitle from './post-title';
import Thumbnail from './thumbnail';
import MasonryItem from './masonry-item';
import RelatedGrid from './related-grid';
import SectionSeparator from './section-separator';
import NavbarMobile from './navbar-mobile';
import HeroSvg from './hero-svg';
import NavbarDesktop from './navbar-desktop';
import SearchBar from './search-bar';
import LogoGold from './logo-gold-svg';
import Logo from './logo-svg';
import HeaderGold from './header-gold';
import InfoDrawer from './info-drawer';
import Staff from './staff';
import Content from './content';
import Subscribe from './subscribe';
import SideAdImage from './side-ad-image';
import BottomAdImage from './bottom-ad-image';
import SearchResult from './search-result';
import SocialSharing from './social-sharing';

const InfoDrawerWithoutSSR = dynamic(
  () => import('./info-drawer'),
  { ssr: false },
);

export {
  AlertPreview,
  ArtistLink,
  Container,
  Date,
  Footer,
  HeroPost,
  Layout,
  MainImage,
  MasonryGrid,
  Meta,
  PostBody,
  PostHeader,
  RelatedItem,
  PostSubtitle,
  PostTitle,
  Thumbnail,
  MasonryItem,
  RelatedGrid,
  SectionSeparator,
  NavbarMobile,
  HeroSvg,
  NavbarDesktop,
  SearchBar,
  InfoDrawerWithoutSSR,
  PostLayout,
  LogoGold,
  Logo,
  HeaderGold,
  InfoDrawer,
  Content,
  Staff,
  Subscribe,
  SideAdImage,
  BottomAdImage,
  SearchResult,
  SocialSharing
};
