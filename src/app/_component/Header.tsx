"use client";

import styles from './header.module.scss';
import cx from "classnames";
import {utils} from "@/app/_utils/utils";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const items = []
    return (
        <nav className={styles.header}>
            <div className={styles.container}>
                <Link href={`/`} className={styles.mainTitle}>
                    {utils.title}
                </Link>
                <ul className={styles.headerItemsList}>
                    <li className={cx(pathname === '/about' && styles.pageBorderBottom)}>
                        <Link href={`/about`}>
                            ABOUT
                        </Link>
                    </li>
                    {/*<li>*/}
                    {/*    <Link href={`/about`}>*/}
                    {/*        저는요*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                </ul>
            </div>
        </nav>
    )
}
