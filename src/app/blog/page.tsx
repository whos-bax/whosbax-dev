import styles from './blog.module.scss';
import cx from "classnames";
import BlogEach from "@/app/blog/_component/BlogEach";

export default function Blog() {
    const list = [
        {
            title: '제목 1 [Next14 + Netlify] 나를 소개하는 홈페이지 만들기 (5) - 방명록 (feat. Utterances) [Next14 + Netlify] 나를 소개하는 홈페이지 만들기 (5) - 방명록 (feat. Utterances) [Next14 + Netlify] 나를 소개하는 홈페이지 만들기 (5) - 방명록 (feat. Utterances)',
            content: '내용입니다. 내용입니다. 내용입니다. 내용입니다. 제목 1 [Next14 + Netlify] 나를 소개하는 홈페이지 만들기 (5) - 방명록 (feat. Utterances) [Next14 + Netlify] 나를 소개하는 홈페이지 만들기 (5) - 방명록 (feat. Utterances) [Next14 + Netlify] 나를 소개하는 홈페이지 만들기 (5) - 방명록 (feat. Utterances)',
            created_at: new Date('2024-05-21'),
            image: `/assets/images/profile.jpg`,
        },
        {
            title: '제목 2 [Next14 + Netlify] 나를 소개하는 홈페이지 만들기 (5) - 방명록 (feat. Utterances)',
            content: '내용입니다. 내용입니다. 내용입니다. 내용입니다. 제목 1 [Next14 + Netlify] 나를 소개하는 홈페이지 만들기 (5) - 방명록 (feat. Utterances) [Next14 + Netlify] 나를 소개하는 홈페이지 만들기 (5) - 방명록 (feat. Utterances) [Next14 + Netlify] 나를 소개하는 홈페이지 만들기 (5) - 방명록 (feat. Utterances)',
            created_at: new Date('2024-05-12'),
            image: `/assets/images/profile.jpg`,
        },
        {
            title: '제목 3 [Next14 + Netlify] 나를 소개하는 홈페이지 만들기 (5) - 방명록 (feat. Utterances)',
            content: '내용입니다. 내용입니다. 내용입니다. 내용입니다. 제목 1 [Next14 + Netlify] 나를 소개하는 홈페이지 만들기 (5) - 방명록 (feat. Utterances) [Next14 + Netlify] 나를 소개하는 홈페이지 만들기 (5) - 방명록 (feat. Utterances) [Next14 + Netlify] 나를 소개하는 홈페이지 만들기 (5) - 방명록 (feat. Utterances)',
            created_at: new Date('2024-05-01'),
            image: `/assets/images/profile.jpg`,
        },
    ]
    return (
        <main className={cx(styles.container)}>
            {list.length > 0 ? (
                <>
                    {list.map((blog, idx) => (
                        <BlogEach key={`blog-${idx}`} blog={blog}/>
                    ))}
                </>
            ) : (
                <div></div>
            )}
        </main>
    )
}
