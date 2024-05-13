"use client";

import styles from '../about.module.scss';
import resumeProfile from '../../../../public/assets/images/resume_profile.jpg'
import Image from "next/image";
import Link from "next/link";

type Contact = {
    type: string;
    content: string;
}
const contactList: Contact[] = [
    {
        type: 'Email',
        content: 'mailto:whoamiiii04@gmail.com'
    },
    {
        type: 'Github',
        content: 'https://github.com/whos-bax'
    },
    {
        type: 'LinkedIn',
        content: 'https://www.linkedin.com/in/whoamiiii04/'
    }
]
export default function Profile() {
    return (
        <div className={styles.profileComponent}>
            <div className={styles.profileSummaryContent}>
                <h4>FRONTEND DEVELOPER</h4>
                <h3 className={styles.profileName}>SANGHO PARK</h3>
                <div className={styles.contactList}>
                    {contactList.map((contact, idx) => (
                        <div key={`contact-${idx}`} className={styles.contactEach}>
                            <p>{contact.type} :</p>
                            <Link href={contact.content} target={'_blank'}>
                                {contact.content.replace("mailto:", '')}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.profileImageBackground}>
                <div className={styles.profileImageDiv}>
                    <Image priority={true} src={resumeProfile} alt={`profile`} width={300} height={300}/>
                </div>
            </div>
        </div>
    )
}
