import React from 'react';
import styles from './index.module.scss';

export default function Empty() {
  return (
    <div className={styles['empty']}>
      <div className={styles['empty-img']}></div>
      <div className={styles['empty-text']}>未找到符合条件的韵脚~</div>
    </div>
  );
}
