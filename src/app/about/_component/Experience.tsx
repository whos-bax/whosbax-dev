"use client";

import styles from '../about.module.scss'
import cx from "classnames";
import dayjs from "dayjs";
import Link from "next/link";
import {experienceList, linkSvg} from "@/app/_utils/utils";
import ExperienceDetail from "@/app/about/_component/ExperienceDetail";

type Props = {
    title: string;
}

const expList = [
    // {
    //     startDate: '2022-05-26',
    //     endDate: '',
    //     name: '텐서큐브',
    //     department: '개발팀/팀원(프리)',
    //     // link: 'https://howtoyak.com/',
    //     description: `데이터 라벨링 AI 산업`
    // },
    {
        startDate: '2022-08-24',
        endDate: '2024-03-08',
        name: '하우투약',
        department: '개발팀/팀원',
        link: 'https://howtoyak.com/',
        description: `약사 인플루언서와 함께하는 영양제 플랫폼, <b>당신의 영양제</b> 서비스 스타트업`
    }
]
export default function Experience({title}: Props) {

    return (
        <div className={styles.columnComponent}>
            <h4 className={styles.componentTitle}>
                {title.toUpperCase()}
            </h4>
            {expList.map((item, idx) => (
                <div className={cx(styles.componentBody, styles.experienceBody)} key={`${item.name}-${idx}`}>
                    <div className={styles.period}>
                        <p>{dayjs(item.startDate).format("YYYY.MM")} - {item.endDate ? dayjs(item.endDate).format("YYYY.MM") : '진행중'}</p>
                    </div>
                    <div className={styles.content}>
                        {item.link ? (
                            <Link href={item.link}
                                  target={'_blank'}
                                  className={styles.companyName}
                                  dangerouslySetInnerHTML={{__html: item.name + ' ' + linkSvg}}
                            />
                        ) : (
                            <p className={styles.companyName}>{item.name}</p>
                        )}
                        <p>{item.department}</p>
                        <p className={styles.description} dangerouslySetInnerHTML={{__html: item.description}}/>
                        <div className={cx(styles.experienceList)}>
                            {experienceList.find(value => value.company === item.name)?.list.map((item, idx) => (
                                <ExperienceDetail key={`experience-${idx}`} item={item}/>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
