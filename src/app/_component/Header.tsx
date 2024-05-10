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
                <ul className={styles.headerItemsList}>
                    <li>
                        <Link href={`/about`}>
                            저는요
                        </Link>
                    </li>
                    <li>
                        <Link href={`/about`}>
                            저는요
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
