import styles from './timeline.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Fab from '@/app/_component/Fab';
import { fetchTimelineData } from '@/features/timeline';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '꿈이 많은 어른 아이 | 박상호',
  description:
    '하고 싶은 것도 이루고 싶은 것도 너무나 많은, 어른이지만 아이처럼 - 다양한 삶의 흔적을 작성해 보았습니다.',
};

export default async function Timeline() {
  const timelineData = await fetchTimelineData();

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
        <div className={styles.timelineLabelMobile}>
          <span>Career, Music, Activities</span>
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
                        <Link href={item.link} target="_blank">
                          {item.album || item.title}
                        </Link>
                      ) : (
                        item.album || item.title
                      )}
                      {item.isTitle && !item.artist && (
                        <span className={styles.titleBadge}>★</span>
                      )}
                    </h4>
                  </div>
                  {item.role && <p className={styles.itemRole}>{item.role}</p>}
                  {item.artist && (
                    <>
                      <p className={styles.featArtist}>{item.artist}</p>
                      <ul className={styles.trackList}>
                        {item.featTracks ? (
                          item.featTracks.map((track, trackIndex) => (
                            <li
                              key={trackIndex}
                              className={track.isTitle ? styles.titleTrack : ''}
                            >
                              <span className={styles.trackNumber}>
                                {track.trackNum}
                              </span>
                              {track.name}
                              {track.isTitle && (
                                <span className={styles.titleBadge}>★</span>
                              )}
                            </li>
                          ))
                        ) : (
                          <li className={item.isTitle ? styles.titleTrack : ''}>
                            <span className={styles.trackNumber}>
                              {item.trackNum}
                            </span>
                            {item.title}
                            {item.isTitle && (
                              <span className={styles.titleBadge}>★</span>
                            )}
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
                        const trackName =
                          typeof track === 'string' ? track : track.name;
                        const isTitle =
                          typeof track === 'object' && track.isTitle;
                        return (
                          <li
                            key={trackIndex}
                            className={isTitle ? styles.titleTrack : ''}
                          >
                            <span className={styles.trackNumber}>
                              {trackIndex + 1}
                            </span>
                            {trackName}
                            {isTitle && (
                              <span className={styles.titleBadge}>★</span>
                            )}
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
