import { NextPage } from "next";
import styles from './page.module.scss';
import Link from "next/link";
import {redirect} from "next/navigation";

const NotFound: NextPage = () => {
    // redirect('/')
    return null;
    // return (
    //     <div className={styles.container}>
    //         <div>
    //             이 페이지는 존재하지 않습니다. 다른 페이지를 검색해 보세요.
    //         </div>
    //         <Link href={`/`}>검색</Link>
    //     </div>
    // )
}

export default NotFound
