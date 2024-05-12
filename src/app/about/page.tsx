import styles from './about.module.scss';
import Profile from "@/app/about/_component/Profile";

export default function About() {
    return (
        <main className={styles.container}>
            <Profile/>
        </main>
    )
}
