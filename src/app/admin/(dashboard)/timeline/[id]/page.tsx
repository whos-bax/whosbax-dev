import { notFound } from 'next/navigation';
import { getTimelineById } from '@/features/timeline';
import TimelineForm from '../../../_components/TimelineForm';
import TrackEditor from '../../../_components/TrackEditor';
import styles from '../../../admin.module.scss';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditTimelinePage({ params }: Props) {
  const { id } = await params;
  const timeline = await getTimelineById(id);

  if (!timeline) {
    notFound();
  }

  const showTrackEditor = ['music', 'featuring'].includes(timeline.type);

  return (
    <div className={styles.adminPage}>
      <TimelineForm initialData={timeline} mode="edit" />
      {showTrackEditor && (
        <div className={styles.trackEditorWrapper}>
          <TrackEditor timelineId={timeline.id} initialTracks={timeline.tracks} />
        </div>
      )}
    </div>
  );
}
