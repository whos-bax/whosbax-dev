"use client";

import styles from './comment.module.scss';
import UtteranceComment from "@/app/_component/UtteranceComment";
import {useEffect, useState} from "react";
import Loading from "@/app/_component/Loading";

export default function Comment() {
    const [commentShow, setCommentShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCommentShow(true);
        }, 2000)

        return () => clearTimeout(timer)

    }, []);
    return (
        <main className={styles.container}>
            <div className={styles.commentInfo}>
                <h3>방명록</h3>
                <p>남기신 말씀 소중히 간직하겠습니다 😊</p>
                <p>좋은 하루 되세요 :)</p>
            </div>
            <div className={styles.commentComponent}>
                {!commentShow && (
                    <div className={styles.loadingComponent}>
                        <Loading/>
                    </div>
                )}
                <UtteranceComment/>
            </div>
        </main>
    )
}
