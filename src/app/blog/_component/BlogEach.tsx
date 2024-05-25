import styles from '../blog.module.scss'
import Image from "next/image";
import dayjs from "dayjs";

type Props = {
    title: string,
    content: string,
    created_at: Date,
    image: string,
}

const BlogEach = ({blog}: { blog: Props }) => {
    return (
        <div className={styles.blogEach}>
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
                <Image
                    src={blog.image}
                    alt={blog.title}
                    width={300}
                    height={300}
                />
            </div>
        </div>
    )
}

export default BlogEach
