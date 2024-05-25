"use client";

import styles from '../about.module.scss';
import {ExperienceType} from "@/model/ExperienceType";
import dayjs from "dayjs";
import Link from "next/link";
import {linkSvg} from "@/app/_utils/utils";
import {useState} from "react";

type Props = {
    item: ExperienceType
}

const angleUp = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>`;
const angleDown = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>`;

export default function ExperienceDetail({item}: Props) {
    const [detailShow, setDetailShow] = useState<boolean>(true);
    const handleDetailShow = () => setDetailShow(!detailShow);
    return (
        <div className={styles.experienceDetail}>
            <div>
                <h6 className={styles.title}>
                    {item.title}
                </h6>
                <p className={styles.date}>
                    {dayjs(item.startDate).format("YYYY.MM")} - {dayjs(item.endDate).format("YYYY.MM")}
                </p>
            </div>
            {item.linkList.length > 0 && (
                <div className={styles.linkList}>
                    <div
                        className={styles.linkSvg}
                        dangerouslySetInnerHTML={{__html: linkSvg}}
                    />
                    {item.linkList?.map((link, idx) => (
                        <Link
                            href={link.link}
                            key={`experience-${idx}`}
                            className={styles.link} target={"_blank"}
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
            )}
            <div className={styles.descriptionBody}>
                <p className={styles.detailDescription}>{item.description}</p>
                <div className={styles.skillList}>
                    {item.skills.map((skill, idx) => (
                        <p key={`experience-skills-${idx}`} className={styles.skill}>
                            {skill}
                        </p>
                    ))}
                </div>
                <button
                    className={styles.summaryDetailListButton}
                    onClick={handleDetailShow}
                    dangerouslySetInnerHTML={{__html: detailShow ? angleUp : angleDown}}
                />
                {detailShow && (
                    <ul className={styles.summaryDetailList}>
                        {item.summaryList?.map((summary, idx) => (
                            <li key={`experience-summary-${idx}`} className={styles.summaryDetail}>
                                {summary}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
