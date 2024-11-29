import styles from '@/app/about/about.module.scss';
import { skillList } from '@/app/_utils/utils';

type Props = {
  title: string;
};

export default function Education({ title }: Props) {
  return (
    <div className={styles.columnComponent}>
      <h4 className={styles.componentTitle}>{title.toUpperCase()}</h4>

      <div className={styles.educationList}>
        <li>고려대학교(세종) 수학과 : 2015.03 - 2023.02</li>
        <li>원티드 프리온보딩 프론트엔드 챌린지 : 2024.05</li>
      </div>
    </div>
  );
}
