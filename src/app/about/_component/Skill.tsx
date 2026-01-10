import styles from "@/app/about/about.module.scss";

type Props = {
    title: string;
    skillList: string[];
}

export default function Skill({title, skillList}: Props) {
    return (
        <div className={styles.columnComponent}>
            <h4 className={styles.componentTitle}>
                {title.toUpperCase()}
            </h4>

            <div className={styles.skillItemList}>
                {skillList.map((item, idx) => (
                    <li className={styles.skillItem} key={`skills-${idx}`}>
                        {item}
                    </li>
                ))}
            </div>
        </div>
    )
}
