import styles from "@/app/about/about.module.scss";
import {skillList} from "@/app/_utils/utils";

type Props = {
    title: string;
}

export default function Education({title}: Props) {
    return (
        <div className={styles.columnComponent}>
            <h4 className={styles.componentTitle}>
                {title.toUpperCase()}
            </h4>

            <div className={styles.educationList}>
                <li>고려대학교 세종캠퍼스 수학과 : 2015.03 ~ 2023.02</li>
                <li>정보처리기사 : 2024.06.18 (예정)</li>
            </div>
        </div>
    )
}