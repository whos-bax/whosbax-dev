import styles from './blog.module.scss';
import cx from "classnames";
import BlogEach from "@/app/blog/_component/BlogEach";
import {compareDesc} from "date-fns";
import {allBlogs} from "contentlayer/generated";

export default function Blog() {
    const posts = allBlogs.sort((a, b) => compareDesc(new Date(a.created_at), new Date(b.created_at)));
    return (
        <main className={cx(styles.container)}>
            {posts.length === 0 ? (
                <>
                    {posts.map((blog, idx) => (
                        <BlogEach key={`blog-${idx}`} blog={blog}/>
                    ))}
                </>
            ) : (
                <div>
                    <p>게시글이 없습니다.</p>
                </div>
            )}
        </main>
    )
}
