import styles from '../about.module.scss';
import path from 'path';
import * as process from 'node:process';
import * as fs from 'node:fs';

type Props = {
  title: string;
};

export default async function Introduce({ title }: Props) {
  const filePath = path.join(process.cwd(), 'src/app/_utils/introduce.md');

  const markdownContent = fs.readFileSync(filePath, 'utf-8');
  return (
    <div className={styles.columnComponent}>
      <h4 className={styles.componentTitle}>{title.toUpperCase()}</h4>
      <div className={styles.componentBody}>
        <p
          style={{
            whiteSpace: 'pre-wrap',
          }}
        >
          {markdownContent}
        </p>
      </div>
    </div>
  );
}
