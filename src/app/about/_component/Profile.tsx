"use client";

import styles from '../about.module.scss';
import resumeProfile from '../../../../public/assets/images/resume_profile.jpg'
import Image from "next/image";

export default function Profile() {
    return (
        <div className={styles.profileComponent}>
            <div className={styles.profileImageBackground}>
                <div className={styles.profileImageDiv}>
                    <Image src={resumeProfile} alt={`profile`} width={300} height={300}/>
                </div>
            </div>
            <div className={styles.aboutLeft}>
            </div>
            <div className={styles.aboutRight}></div>
        </div>
    )
}
