import styles from '../blog.module.scss'
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import {Blog as TBlog} from 'contentlayer/generated'

const BlogEach = ({blog}: { blog: TBlog }) => {
    return (
        <Link href={blog.url} className={styles.blogEach}>
            <div className={styles.summaryDiv}>
                <h3 className={styles.title}>
                    {blog.title}
                </h3>
                <p className={styles.content}>
                    {blog.content}
                </p>
                <p className={styles.date}>
                    {dayjs(blog.created_at).fromNow()}
                </p>
            </div>
            <div className={styles.imageDiv}>
                {blog.image && (
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        width={300}
                        height={300}
                    />
                )}
            </div>
        </Link>
    )
}

export default BlogEach
