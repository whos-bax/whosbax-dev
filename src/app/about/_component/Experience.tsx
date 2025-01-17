'use client';

import React from 'react';
import styles from '../about.module.scss';
import cx from 'classnames';
import dayjs from 'dayjs';
import Link from 'next/link';
import { experienceList, linkSvg } from '@/app/_utils/utils';
import ExperienceDetail from '@/app/about/_component/ExperienceDetail';
import { SummaryType } from '@/model/ExperienceType';

type Props = {
  title: string;
};

const summaryList: SummaryType[] = [
  {
    startDate: '2024-07-01',
    endDate: '',
    name: '텐서큐브',
    department: [
      {
        position: '프론트엔드 개발자 (24.07 ~ )',
        tasks: [],
      },
    ],
    link: 'https://tensorcube.net/',
    description: `AI 데이터 라벨링 및 스토리지 서비스를 제공하는 스타트업`,
  },
  {
    startDate: '2022-08-24',
    endDate: '2024-03-08',
    name: '하우투약',
    department: [
      {
        position: '프론트엔드 개발자 및 개발 중간 리더 (22.08 ~ 24.03)',
        tasks: [],
      },
      {
        position: 'PM (22.11 ~ 23.02)',
        tasks: ['MAU 10만 달성, 매출 23억 달성 및 연간 BEP 달성'],
      },
    ],
    link: 'https://howtoyak.com/',
    description: `약사 인플루언서와 함께하는 영양제 플랫폼, <b>당신의 영양제</b> 서비스 스타트업`,
  },
];
export default function Experience({ title }: Props) {
  return (
    <div className={styles.columnComponent}>
      <h4 className={styles.componentTitle}>{title.toUpperCase()}</h4>
      {summaryList.map((item, idx) => (
        <div
          className={cx(styles.componentBody, styles.experienceBody)}
          key={`${item.name}-${idx}`}
        >
          <div className={styles.period}>
            <p>
              {dayjs(item.startDate).format('YYYY.MM')} -{' '}
              {item.endDate ? dayjs(item.endDate).format('YYYY.MM') : '진행중'}
            </p>
          </div>
          <div className={styles.content}>
            {item.link ? (
              <Link
                href={item.link}
                target={'_blank'}
                className={styles.companyName}
                dangerouslySetInnerHTML={{ __html: item.name + ' ' + linkSvg }}
              />
            ) : (
              <p className={styles.companyName}>{item.name}</p>
            )}
            <ol className={styles.department}>
              {item.department.map((value, idx) => (
                <React.Fragment key={idx}>
                  <li key={`department-${idx}`}>{value.position}</li>

                  {value.tasks.length > 0 && (
                    <ul>
                      {value.tasks.map((task, i) => (
                        <li
                          className={styles.inside}
                          key={`department-task-${i}`}
                        >
                          {task}
                        </li>
                      ))}
                    </ul>
                  )}
                </React.Fragment>
              ))}
            </ol>
            <p
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
            <div className={cx(styles.experienceList)}>
              {experienceList
                .find((value) => value.company === item.name)
                ?.list.map((item, idx) => (
                  <ExperienceDetail key={`experience-${idx}`} item={item} />
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
