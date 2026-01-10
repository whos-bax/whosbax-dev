'use client';

import styles from './inkEffect.module.scss';

export default function InkEffect() {
  return (
    <div className={styles.inkContainer}>
      <div className={`${styles.inkBlob} ${styles.ink1}`} />
      <div className={`${styles.inkBlob} ${styles.ink2}`} />
      <div className={`${styles.inkBlob} ${styles.ink3}`} />
      <div className={`${styles.inkBlob} ${styles.ink4}`} />
      <div className={`${styles.inkBlob} ${styles.ink5}`} />
    </div>
  );
}
