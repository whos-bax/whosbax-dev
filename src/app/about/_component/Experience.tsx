'use client';

import React from 'react';
import styles from '../about.module.scss';
import cx from 'classnames';
import dayjs from 'dayjs';
import Link from 'next/link';
import { linkSvg } from '@/app/_utils/utils';
import ExperienceDetail from '@/app/about/_component/ExperienceDetail';
import { experienceList, summaryList } from '@/app/_utils/experienceMocks';

type Props = {
  title: string;
};

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
              {item.endDate ? dayjs(item.endDate).format('YYYY.MM') : '재직중'}
            </p>
          </div>
          <div className={styles.content}>
            <div data-print={'experienceSummary'}>
              {item.link ? (
                <Link
                  href={item.link}
                  target={'_blank'}
                  className={styles.companyName}
                  dangerouslySetInnerHTML={{
                    __html: item.name + ' ' + linkSvg,
                  }}                
                />
              ) : (
                <p className={styles.companyName}>{item.name}</p>
              )}
              {item.department.length > 0 && (
                <ol className={styles.department} data-print={'department'}>
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
              )}
              {item.description && (
                <p
                  className={styles.description}
                  data-print="description"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              )}
            </div>
            <div className={cx(styles.experienceList)}>
              {experienceList
                .find((value) => value.company === item.name)
                ?.list.map((experience, idx) => (
                  <ExperienceDetail
                    key={`experience-${idx}`}
                    summary={item}
                    item={experience}
                  />
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
