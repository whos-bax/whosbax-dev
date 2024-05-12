"use client";

import styles from '../about.module.scss';
import resumeProfile from '../../../../public/assets/images/resume_profile.jpg'
import Image from "next/image";

export default function Profile() {
    return (
        <div className={styles.profileComponent}>
            <div className={styles.profileSummaryContent}>
                <h4>FRONTEND DEVELOPER</h4>
                <h3 className={styles.profileName}>SANGHO PARK</h3>
                <div className={styles.contactDiv}>
                    <p>
                        <b>Email</b> : whoamiiii04@gmail.com
                    </p>
                    <p>
                        <b>Github</b> : https://github.com/whos-bax
                    </p>
                    <p>
                        <b>LinkedIn</b> : https://www.linkedin.com/in/whoamiiii04/
                    </p>
                </div>
            </div>
            <div className={styles.profileImageBackground}>
                <div className={styles.profileImageDiv}>
                    <Image src={resumeProfile} alt={`profile`} width={300} height={300}/>
                </div>
            </div>
        </div>
    )
}
