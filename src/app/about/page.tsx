import styles from './about.module.scss';
import Profile from '@/app/about/_component/Profile';
import Introduce from '@/app/about/_component/Introduce';
import cx from 'classnames';
import Experience from '@/app/about/_component/Experience';
import Skill from '@/app/about/_component/Skill';
import Education from '@/app/about/_component/Education';
import Certificate from '@/app/about/_component/Certificate';
import Fab from '@/app/_component/Fab';
import { fetchExperienceSummary, fetchExperienceDetail } from '@/features/experience';
import { fetchSkills } from '@/features/skills';

export default async function About() {
  const [summaryList, experienceList, skillList] = await Promise.all([
    fetchExperienceSummary(),
    fetchExperienceDetail(),
    fetchSkills(),
  ]);

  return (
    <main
      className={cx(styles.container, styles.containerGap)}
      id={'about-container'}
    >
      <Fab type="print" />
      <Profile />
      <Introduce title={'Introduce'} />
      <Experience
        title={'Experience'}
        summaryList={summaryList}
        experienceList={experienceList}
      />
      <Skill title={'Skill'} skillList={skillList} />
      <Education title={'Education'} />
      <Certificate title={'Certificate'} />
    </main>
  );
}
