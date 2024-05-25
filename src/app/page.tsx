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
    const [count, setCount] = useState<number>(-1);

    useLayoutEffect(() => {
        const countOut = sessionStorage.getItem('count-out');
        if (countOut && countOut === 'true') {
            setCount(14)
        } else {
            setCount(0);
        }
    }, []);

    useEffect(() => {
        if (count > -1 && count <= 14) {
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
                    : mentionList[3];

    const handleResetButton = () => {
        setCount(0)
    }

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
            {count > -1 &&
                <div className={styles.overlay}>
                    {count < 12 ? (
                        <p className={cx(styles.overlayText)} style={countValid ? {} : {animation: "none"}}>
                            {scrollMention}
                        </p>
                    ) : (
                        <div className={cx(styles.overlayAllTextDiv)}>
                            {mentionList.map((mention, idx) => (
                                <p key={`mention-${idx}`} className={styles.overlayAllText}>
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
            }

            {count >= 14 && (
                <button
                    className={styles.resetButton}
                    onClick={handleResetButton}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='1.1rem'>
                        <path
                            d="M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z"/>
                    </svg>
                </button>
            )}
        </main>
    );
}
