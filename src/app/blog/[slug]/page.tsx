import styles from './post.module.scss';
import {allBlogs} from "contentlayer/generated";
import {getMDXComponent} from "mdx-bundler/client";
import dayjs from "dayjs";

export const generateMetadata = ({params}: { params: { slug: string } }) => {
    const post = allBlogs.find((post) => post._raw.flattenedPath === params.slug)
    return {
        title: post!.title,
        description: post!.title,
        openGraph: {
            title: post!.title,
            description: post!.title,
        }
    }
}
const Posts = ({params}: { params: { slug: string } }) => {
    const post = allBlogs.find(post => post._raw.flattenedPath === params.slug);
    const Content = getMDXComponent(post!.body.code);
    return (
        <article className={styles.container}>
            <h1 className={styles.title}>{post?.title}</h1>
            <time dateTime={post?.created_at} className={styles.date}>
                {dayjs(post?.created_at).format("YYYY년 MM월 DD일 dd요일")}
            </time>
            <div className={styles.content}>
                <Content/>
            </div>
        </article>
    )
}
export default Posts;
