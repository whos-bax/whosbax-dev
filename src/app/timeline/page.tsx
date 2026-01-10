import styles from './timeline.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Fab from '@/app/_component/Fab';

export default function Timeline() {

  const timelineData = [
    {
      year: '2025.12.23',
      type: 'featuring',
      tag: 'Feat.',
      title: 'Blueprint (feat. whosbax)',
      artist: 'MAKO, Soo!',
      album: 'SUDAKO',
      trackNum: 2,
    },
    {
      year: '2025.05.22',
      type: 'music',
      tag: 'EP',
      title: "자리 (Where I've Been)",
      cover: '/assets/images/albums/where-ive-been.jpg',
      tracks: [
        'Now I Know',
        '진심 (I meant it)',
        { name: 'Comedy', isTitle: true },
        { name: '이르지 (Too Soon)', isTitle: true },
        "I'm a fool",
      ],
    },
    {
      year: '2025.04.21',
      type: 'career',
      tag: 'Career',
      title: '데이티움',
      role: 'Software Developer',
      desc: 'LLM 활용 블로그 콘텐츠 자동 생성 기능 개발, React Native 앱 리팩토링으로 렌더링 속도 30% 개선',
      link: 'https://www.linkedin.com/company/datium-corp/?originalSubdomain=kr',
    },
    {
      year: '2024.08.14',
      type: 'featuring',
      tag: 'Feat.',
      title: '기도 (feat. whosbax)',
      artist: 'MAKO',
      album: 'makomentary',
      trackNum: 3,
    },
    {
      year: '2024.07.01',
      type: 'career',
      tag: 'Career',
      title: '텐서큐브',
      role: 'Software Developer',
      desc: 'AI 데이터 라벨링 SaaS 개발, WebSocket 기반 대용량 파일 전송 최적화, Docker/Nginx MSA 구축 및 CI/CD 무중단 배포',
      link: 'https://tensorcube.net/',
    },
    {
      year: '2024.04 ~ 06',
      type: 'gap',
      tag: 'Gap Year',
      title: '경력 휴식기',
      desc: '정보처리기사 취득, 컨퍼런스 참가',
    },
    {
      year: '2022.11.04',
      type: 'music',
      tag: 'EP',
      title: 'Aspiration',
      cover: '/assets/images/albums/aspiration.jpg',
      tracks: [
        'Open',
        '타협',
        'Let me up (feat. ONDO)',
        { name: 'Swing (feat. Hardii)', isTitle: true },
        '낭만고양이 (feat. kishy)',
        { name: '홀로 (feat. Godiflow)', isTitle: true },
        'Already know (feat. MAKO)',
      ],
    },
    {
      year: '2022.08.24',
      type: 'career',
      tag: 'Career',
      title: '하우투약',
      role: 'Frontend Developer · PM',
      desc: 'React→Next.js 마이그레이션으로 SEO 300%↑ 매출 10배↑, React Native 앱 개발, PM으로 MAU 10만·매출 23억 달성',
      link: 'https://howtoyak.com/',
    },
    {
      year: '2022.04.09',
      type: 'music',
      tag: 'Single',
      title: "I'm not alone",
      cover: '/assets/images/albums/im-not-alone.jpg',
      tracks: [
        { name: "I'm not alone", isTitle: true },
      ],
    },
    {
      year: '2022.04',
      type: 'activity',
      tag: 'Activity',
      title: '푸른나무재단 정기 기부 시작',
    },
    {
      year: '2022.01.18',
      type: 'featuring',
      tag: 'Feat.',
      artist: 'Jiyoon Heo',
      album: 'walk flow',
      featTracks: [
        { name: 'Do it (feat. whosbax, UMiN)', trackNum: 1, isTitle: true },
        { name: '괜찮아 (feat. NØVA, whosbax)', trackNum: 4 },
      ],
    },
    {
      year: '2021.12.06',
      type: 'music',
      tag: 'EP',
      title: 'who am I ?',
      cover: '/assets/images/albums/who-am-i.jpg',
      tracks: [
        'Moonlight',
        'Paradise',
        'With no Stop',
        { name: 'Goodbye (feat. DOPA)', isTitle: true },
        "Don't taste me (feat. 가우(GOW))",
        'Color',
        'Way out',
      ],
    },
    {
      year: '2021.05',
      type: 'activity',
      tag: 'Activity',
      title: '세종 UNION 창업캠프 최우수상',
    },
    {
      year: '2020.10.05',
      type: 'music',
      tag: 'Single',
      title: 'Red Rose',
      cover: '/assets/images/albums/red-rose.jpg',
      tracks: [
        'True (Prod. 9una)',
        { name: 'Another Sight (feat. kishy) (Prod. 9una)', isTitle: true },
      ],
    },
    {
      year: '2020.09.21',
      type: 'featuring',
      tag: 'Feat.',
      title: '잘난놈 (feat. whosbax)',
      artist: 'Hardii, inkL',
      album: 'BLUE HIDEOUT MADE',
      trackNum: 2,
    },
    {
      year: '2020.09.07',
      type: 'music',
      tag: 'Single',
      title: 'Aurora Caffeine',
      cover: '/assets/images/albums/aurora-caffeine.jpg',
      tracks: [
        { name: 'Aurora Caffeine (Prod. 9una)', isTitle: true },
      ],
    },
    {
      year: '2020.08',
      type: 'featuring',
      tag: 'Feat.',
      title: 'Purple Sunset (feat. whosbax)',
      artist: 'I.L.LAVINE',
      album: 'Purple Sunset',
      trackNum: 1,
      isTitle: true,
    },
  ];

  return (
    <main className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <span className={styles.tagline}>TIMELINE</span>
      </section>

      {/* Timeline */}
      <section className={styles.timelineSection}>
        <div className={styles.timelineLabels}>
          <span className={styles.labelLeft}>Career</span>
          <span className={styles.labelRight}>Music & Activities</span>
        </div>
        <div className={styles.timeline}>
          {timelineData.map((item, index) => {
            const isLeft = ['career', 'gap'].includes(item.type);
            return (
              <div
                key={index}
                className={`${styles.timelineItem} ${isLeft ? styles.left : styles.right}`}
              >
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <span className={styles.timelineYear}>{item.year}</span>
                    <span
                      className={
                        item.type === 'music'
                          ? styles.timelineTag
                          : item.type === 'featuring'
                          ? styles.timelineTagFeat
                          : item.type === 'career'
                          ? styles.timelineTagCareer
                          : item.type === 'gap'
                          ? styles.timelineTagGap
                          : item.type === 'education'
                          ? styles.timelineTagEdu
                          : styles.timelineTagAlt
                      }
                    >
                      {item.tag}
                    </span>
                  </div>
                  <div className={styles.titleRow}>
                    {item.cover && (
                      <Image
                        src={item.cover}
                        alt={item.title}
                        width={48}
                        height={48}
                        className={styles.albumCover}
                      />
                    )}
                    <h4>
                      {item.link ? (
                        <Link href={item.link} target="_blank">{item.album || item.title}</Link>
                      ) : (
                        item.album || item.title
                      )}
                      {item.isTitle && !item.artist && <span className={styles.titleBadge}>★</span>}
                    </h4>
                  </div>
                  {item.role && (
                    <p className={styles.itemRole}>{item.role}</p>
                  )}
                  {item.artist && (
                    <>
                      <p className={styles.featArtist}>{item.artist}</p>
                      <ul className={styles.trackList}>
                        {item.featTracks ? (
                          item.featTracks.map((track, trackIndex) => (
                            <li key={trackIndex} className={track.isTitle ? styles.titleTrack : ''}>
                              <span className={styles.trackNumber}>{track.trackNum}</span>
                              {track.name}
                              {track.isTitle && <span className={styles.titleBadge}>★</span>}
                            </li>
                          ))
                        ) : (
                          <li className={item.isTitle ? styles.titleTrack : ''}>
                            <span className={styles.trackNumber}>{item.trackNum}</span>
                            {item.title}
                            {item.isTitle && <span className={styles.titleBadge}>★</span>}
                          </li>
                        )}
                      </ul>
                    </>
                  )}
                  {item.desc && !item.artist && (
                    <p className={styles.itemDesc}>{item.desc}</p>
                  )}
                  {item.tracks && (
                    <ul className={styles.trackList}>
                      {item.tracks.map((track, trackIndex) => {
                        const trackName = typeof track === 'string' ? track : track.name;
                        const isTitle = typeof track === 'object' && track.isTitle;
                        return (
                          <li key={trackIndex} className={isTitle ? styles.titleTrack : ''}>
                            <span className={styles.trackNumber}>{trackIndex + 1}</span>
                            {trackName}
                            {isTitle && <span className={styles.titleBadge}>★</span>}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Fab type="music" />
    </main>
  );
}
