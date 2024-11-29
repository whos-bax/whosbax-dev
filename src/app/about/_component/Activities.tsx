import styles from '@/app/about/about.module.scss';
import { skillList } from '@/app/_utils/utils';

type Props = {
  title: string;
};

export default function Activities({ title }: Props) {
  return (
    <div className={styles.columnComponent}>
      <h4 className={styles.componentTitle}>{title.toUpperCase()}</h4>

      <div className={styles.educationList}>
        <li>세종 UNION 창업캠프 최우수상 : 2021.05</li>
        <li>푸른나무재단 기부 : 2022.04 ~</li>
        <li>EO 리얼밸리 컨퍼런스 : 2024.07</li>
        <li>프론트엔드 코리아 2024 컨퍼런스 : 2024.08</li>
        <li>요즘사 파인더스 클럽 2기 : 2024.06 ~ 2024.08</li>
      </div>
    </div>
  );
}
