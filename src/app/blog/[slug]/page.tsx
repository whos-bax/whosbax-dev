import styles from './post.module.scss';
import {allBlogs} from "contentlayer/generated";
import {getMDXComponent} from "mdx-bundler/client";
import dayjs from "dayjs";
import cx from "classnames";
import 'github-markdown-css/github-markdown-light.css';
import {customMeta} from "@/app/_utils/customMeta";

export const generateMetadata = ({params}: { params: { slug: string } }) => {
    const post = allBlogs.find((post) => post._raw.flattenedPath === params.slug)
    return {
        ...customMeta,
        title: post!.title,
        description: post!.description,
        openGraph: {
            title: post!.title,
            description: post!.description,
            type: 'article',
            locale: 'ko_KR',
            publishedTime: post?.created_at,
        }
    }
}

const Posts = ({params}: { params: { slug: string } }) => {
    const post = allBlogs.find(post => post._raw.flattenedPath === params.slug);
    const Content = getMDXComponent(post!.body.code);
    return (
        <article className={styles.container}>
            <h1 className={styles.title}>{post?.title}</h1>
            <h3 className={styles.description}>{post?.description}</h3>
            <time dateTime={post?.created_at} className={styles.date}>
                {dayjs(post?.created_at).format("YYYY년 MM월 DD일 ddd요일 hh시 mm분")}
            </time>
            <div className={cx(styles.content, 'markdown-body')}>
                <Content/>
            </div>
        </article>
    )
}
export default Posts;
