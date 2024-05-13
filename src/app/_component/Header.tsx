"use client";

import styles from './header.module.scss';
import cx from "classnames";
import {utils} from "@/app/_utils/utils";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const linkItems = [
        {
            title: 'about',
            link: '/about'
        },
        {
            title: 'guestbook',
            link: '/guestbook'
        }
    ]
    return (
        <nav className={styles.header}>
            <div className={styles.container}>
                <Link href={`/`} className={styles.mainTitle}>
                    {utils.title}
                </Link>
                <ul className={styles.headerItemsList}>
                    {linkItems.map((item, idx) => (
                        <li className={cx(pathname === item.link && styles.pageBorderBottom)} key={idx}>
                            <Link href={item.link}>
                                {item.title.toUpperCase()}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}
