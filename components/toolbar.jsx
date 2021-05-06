import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Toolbar.module.css';

export const Toolbar = () => {
  const router = useRouter();
  return (
    <div className={styles.main}>
      <div>info</div>
      <div>interviews</div>
      <div>logo</div>
      <div>stuff we like</div>
      <div>serach bar</div>
    </div>
  );
};
