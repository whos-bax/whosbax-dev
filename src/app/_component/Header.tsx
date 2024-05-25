"use client";

import styles from './header.module.scss';
import cx from "classnames";
import {utils} from "@/app/_utils/utils";
import Link from "next/link";
import {usePathname} from "next/navigation";
import Icons from "@/app/_component/headerIcon/icons";
import {useState} from "react";

export default function Header() {
    const pathname = usePathname();
    const linkItems = [
        // {
        //     title: 'blog',
        //     link: '/blog'
        // },
        {
            title: 'about',
            link: '/about'
        },
        {
            title: 'guestbook',
            link: '/guestbook'
        }
    ];

    const [barShow, setBarShow] = useState(false);
    const clickBarShow = () => setBarShow(!barShow);

    return (
        <nav className={styles.header}>
            <div className={styles.container}>
                <Link href={`/`} className={styles.mainTitle}>
                    {utils.title}
                </Link>
                <ul className={cx(styles.headerItemsList)}>
                    {linkItems.map((item, idx) => (
                        <li
                            className={cx(pathname === item.link && styles.pageBorderBottom)}
                            key={`header-link-${idx}`}
                        >
                            <Link href={item.link}>
                                {item.title.toUpperCase()}
                            </Link>
                        </li>
                    ))}
                </ul>
                <ul className={cx(styles.headerItemsList, styles.mobile)}>
                    {!barShow ? (
                        <button className={styles.headerIcon} onClick={clickBarShow}>
                            <Icons.hamburger/>
                        </button>
                    ) : (
                        <button className={styles.headerIcon} onClick={clickBarShow}>
                            <Icons.close/>
                        </button>
                    )}
                    <div className={cx(styles.headerMobileList, barShow && styles.headerMobileListShow)}>
                        {linkItems.map((item, idx) => (
                            <li
                                className={cx(pathname === item.link && styles.pageBorderBottom)}
                                key={`header-link-m-${idx}`}
                            >
                                <Link href={item.link}>
                                    {item.title.toUpperCase()}
                                </Link>
                            </li>
                        ))}
                    </div>
                </ul>
            </div>
        </nav>
    )
}
