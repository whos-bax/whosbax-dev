import styles from "@/app/about/about.module.scss";
import {skillList} from "@/app/_utils/utils";

type Props = {
    title: string;
}

export default function Certificate({title}: Props) {
    return (
        <div className={styles.columnComponent}>
            <h4 className={styles.componentTitle}>
                {title.toUpperCase()}
            </h4>

            <div className={styles.educationList}>
                <li>정보처리기사 : 2024.06.18</li>
            </div>
        </div>
    )
}
