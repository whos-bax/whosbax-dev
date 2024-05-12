import styles from './about.module.scss';
import Profile from "@/app/about/_component/Profile";
import Introduce from "@/app/about/_component/Introduce";
import cx from "classnames";
import Experience from "@/app/about/_component/Experience";
import Skill from "@/app/about/_component/Skill";

export default function About() {
    return (
        <main className={cx(styles.container, styles.containerGap)}>
            <Profile/>
            <Introduce title={'Introduce'}/>
            <Experience title={'Experience'}/>
            <Skill title={'Skill'}/>
        </main>
    )
}
