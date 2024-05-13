"use client";

import styles from '../about.module.scss';
import {ExperienceType} from "@/model/ExperienceType";
import dayjs from "dayjs";
import Link from "next/link";
import {linkSvg} from "@/app/_utils/utils";

type Props = {
    item: ExperienceType
}
export default function ExperienceDetail({item}: Props) {
    return (
        <div className={styles.experienceDetail}>
            <h6 className={styles.title}>
                {item.title}
            </h6>
            <p className={styles.date}>
                {dayjs(item.startDate).format("YYYY.MM")} - {dayjs(item.endDate).format("YYYY.MM")}
            </p>
            {item.linkList.length > 0 && (
                <div className={styles.linkList}>
                    <div
                        className={styles.linkSvg}
                        dangerouslySetInnerHTML={{__html: linkSvg}}
                    />
                    {item.linkList?.map((link, idx) => (
                        <Link href={link.link} key={idx} className={styles.link} target={"_blank"}>
                            {link.title}
                        </Link>
                    ))}
                </div>
            )}
            <div className={styles.descriptionBody}>
                <p className={styles.detailDescription}>{item.description}</p>
                <div className={styles.skillList}>
                    {item.skills.map((skill, idx) => (
                        <p key={idx} className={styles.skill}>
                            {skill}
                            {idx !== item.skills.length - 1 && ","}
                        </p>
                    ))}
                </div>
                <ul className={styles.summaryDetailList}>
                    {item.summaryList?.map((summary, idx) => (
                        <li key={idx} className={styles.summaryDetail}>
                            {summary}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
