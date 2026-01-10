import styles from './about.module.scss';
import Profile from '@/app/about/_component/Profile';
import Introduce from '@/app/about/_component/Introduce';
import cx from 'classnames';
import Experience from '@/app/about/_component/Experience';
import Skill from '@/app/about/_component/Skill';
import Education from '@/app/about/_component/Education';
import Certificate from '@/app/about/_component/Certificate';
import Fab from '@/app/_component/Fab';

export default function About() {
  return (
    <main
      className={cx(styles.container, styles.containerGap)}
      id={'about-container'}
    >
      <Fab type="print" />
      <Profile />
      <Introduce title={'Introduce'} />
      <Experience title={'Experience'} />
      <Skill title={'Skill'} />
      <Education title={'Education'} />
      <Certificate title={'Certificate'} />
    </main>
  );
}
