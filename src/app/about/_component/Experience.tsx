import styles from '../about.module.scss'
import cx from "classnames";
import dayjs from "dayjs";
import Link from "next/link";

type Props = {
    title: string;
}

const expList = [
    {
        startDate: '2022-08-24',
        endDate: '2024-03-08',
        name: '하우투약',
        department: '개발팀/직원',
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
                        {dayjs(item.startDate).format("YYYY.MM")} - {dayjs(item.endDate).format("YYYY.MM")}
                    </div>
                    <div className={styles.content}>
                        <Link href={item.link} className={styles.companyName} dangerouslySetInnerHTML={{__html: item.name}}/>
                        <p>{item.department}</p>
                        <p className={styles.description} dangerouslySetInnerHTML={{__html: item.description}}/>
                    </div>
                </div>
            ))}
        </div>
    )
}
