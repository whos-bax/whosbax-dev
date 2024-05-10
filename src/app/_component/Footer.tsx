import styles from './footer.module.scss';
import Image from "next/image";
import profile from "../../../public/assets/images/profile.jpg";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <Image
                    className={styles.profileImage}
                    src={profile}
                    alt={`profile`}
                    width={200}
                    height={200}
                />
                <div className={styles.profileDiv}>
                    <h3>박상호</h3>
                    <p>
                        하고 싶은 것도 이루고 싶은 것도 너무나 많은,{"\n"}<b>어른이지만 아이처럼</b>
                    </p>
                    <p>
                        본질을 추구하고 기록하고자 합니다.
                    </p>
                    {/*<FontAwesomeIcon icon="fa-brands fa-instagram" />*/}
                </div>
            </div>
        </footer>
    )
}
