import React from 'react';
import styles from './index.module.scss';
export default function Loading({ show }: { show: boolean }) {
  return (
    <div className={`${styles.loading} ${show ? '' : styles.hide}`}>
      <div className={styles['loading-shape']}></div>
    </div>
  );
}
