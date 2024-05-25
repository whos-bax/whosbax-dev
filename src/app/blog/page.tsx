import styles from './blog.module.scss';
import cx from "classnames";
import BlogEach from "@/app/blog/_component/BlogEach";
import {compareDesc} from "date-fns";
import {allBlogs} from "contentlayer/generated";
import ModeRoundedIcon from '@mui/icons-material/ModeRounded';

export default function Blog() {
    const posts = allBlogs.sort((a, b) => compareDesc(new Date(a.created_at), new Date(b.created_at)));
    return (
        <main className={cx(styles.container)}>
            {posts.length > 0 ? (
                <div className={styles.blogBody}>
                    <p className={styles.total}>
                        전체 글 <span>{posts.length}</span>
                    </p>
                    {posts.map((blog, idx) => (
                        <BlogEach key={`blog-${idx}`} blog={blog}/>
                    ))}
                </div>
            ) : (
                <div className={cx(styles.blogBody, styles.noPosts)}>
                    <ModeRoundedIcon sx={{width: 50, height: 50, fill: 'var(--gray600)'}}/>
                    <p className={styles.notice}>게시글이 없습니다.</p>
                </div>
            )}
        </main>
    )
}
