'use client';

import styles from './loading.module.scss';

export default function Loading() {
    return (
        <div className={styles.loaderBg}>
            <span className={styles.loader}/>
        </div>
    )
}
