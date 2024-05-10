import styles from './header.module.scss';
import {utils} from "@/app/_utils/utils";
import Link from "next/link";

export default function Header() {
    const items = []
    return (
        <nav className={styles.header}>
            <div className={styles.container}>
                <Link href={`/`} className={styles.mainTitle}>
                    {utils.title}
                </Link>
                <div className={styles.headerItemsList}>
                    <Link href={`/about`}>
                        저는요
                    </Link>
                    <Link href={`/about`}>
                        저는요
                    </Link>
                </div>
            </div>
        </nav>
    )
}
