import styles from '@/app/about/about.module.scss';
import { skillList } from '@/app/_utils/utils';

type Props = {
  title: string;
};

export default function Activities({ title }: Props) {
  return (
    <div className={styles.columnComponent}>
      <h4 className={styles.componentTitle}>{title.toUpperCase()}</h4>

      <ul className={styles.educationList}>
        <li>세종 UNION 창업캠프 최우수상 : 2021.05</li>
        <li>푸른나무재단 기부 : 2022.04 ~</li>
      </ul>
    </div>
  );
}
