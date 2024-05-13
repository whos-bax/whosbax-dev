'use client';

import styles from "./page.module.scss";
import firstImage from '../../public/assets/images/first-image.jpg'
import Image from "next/image";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import cx from "classnames";
import {Progress} from "@nextui-org/react";
import Link from "next/link";

const mentionList = [
    '성장하지 않는 내일이\n무섭습니다.',
    '어제보다 더 나은 오늘을\n만들어보려 합니다.',
    '안녕하세요,\n꿈이 많은 어른 아이',
    '박상호 입니다.'
]
export default function Home() {
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // 1.5 -> 3, 3 -> 4.5, 4.5 -> 6, 6 -> 7.5
    const [count, setCount] = useState(0);

    useLayoutEffect(() => {
        const countOut = sessionStorage.getItem('count-out');
        if (countOut && countOut === 'true') {
            setCount(14)
        }
    }, []);

    useEffect(() => {
        if (count <= 14) {
            timerRef.current = setInterval(() => {
                setCount((prev) => prev + 0.01);
            }, 10);

            return () => {
                clearInterval(timerRef.current as NodeJS.Timeout);
            };
        } else {
            sessionStorage.setItem('count-out', 'true');
        }
    }, [count]);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const countValid =
        count >= 1.5 && count <= 4
        || count >= 4.1 && count <= 6.5
        || count >= 6.6 && count <= 9
        || count >= 9.1

    const scrollMention =
        count <= 4 ? mentionList[0]
            : count <= 6.5 ? mentionList[1]
                : count <= 9 ? mentionList[2]
                    : mentionList[3]

    return (
        <main className={styles.container}>
            <Image
                className={styles.backgroundImage}
                src={firstImage}
                alt={'first-image'}
                width={3000}
                height={3000}
                priority={true}
                // onLoad={imageOnLoad}
            />
            <div className={styles.overlay}>
                {count < 12 ? (
                    <p className={cx(styles.overlayText)} style={countValid ? {} : {animation: "none"}}>
                        {scrollMention}
                    </p>
                ) : (
                    <div className={cx(styles.overlayAllTextDiv)}>
                        {mentionList.map((mention, idx) => (
                            <p key={idx} className={styles.overlayAllText}>
                                {mention}
                            </p>
                        ))}
                    </div>
                )}

                {count < 13 ? (
                    <Progress
                        aria-label="Loading..."
                        className={styles.progress}
                        style={count > 12 ? {
                            width: `${(((13 - count) / 2) * 100).toFixed(5)}%`
                        } : {}}
                        size="sm"
                        value={Math.round(count / 12 * 100)}
                    />
                ) : (
                    <Link href={'/about'} className={cx(styles.progress, styles.progressButton)}>
                        ABOUT ME
                    </Link>
                )}
            </div>
        </main>
    );
}
