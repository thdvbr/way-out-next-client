/* eslint-disable import/prefer-default-export */
import React from 'react';
import Link from 'next/link';
import styles from '../styles/Toolbar.module.css';

export const Toolbar = () => (
  <div className={styles.main}>
      <div>
    <Link href="/">
      <a>info</a>
    </Link>
    </div>
    <div>interviews</div>
    <div>logo</div>
    <div>stuff we like</div>
    <div>serach bar</div>
  </div>
);
