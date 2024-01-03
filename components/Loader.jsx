// components/Loader.js
import React from 'react';
import styles from '../src/app/page.module.css'

const Loader = () => {
  return (
    <div className={`${styles.loaderContainer}`}>
      <div className={`${styles.loader}`}></div>
    </div>
  );
};

export default Loader;
