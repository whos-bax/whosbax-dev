'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import type { TimelineTrack } from '@/features/timeline';
import styles from '../admin.module.scss';

interface Props {
  timelineId: string;
  initialTracks: TimelineTrack[];
}

interface LocalTrack {
  id?: string;
  name: string;
  track_num: number;
  is_title: boolean;
  sort_order: number;
  isNew?: boolean;
  isDeleted?: boolean;
}

export default function TrackEditor({ timelineId, initialTracks }: Props) {
  const [tracks, setTracks] = useState<LocalTrack[]>(
    initialTracks.map((t, i) => ({
      id: t.id,
      name: t.name,
      track_num: t.track_num,
      is_title: t.is_title,
      sort_order: t.sort_order || i + 1,
    }))
  );
  const [isSaving, setIsSaving] = useState(false);

  const addTrack = () => {
    const maxOrder = Math.max(0, ...tracks.map((t) => t.sort_order));
    setTracks((prev) => [
      ...prev,
      {
        name: '',
        track_num: prev.length + 1,
        is_title: false,
        sort_order: maxOrder + 1,
        isNew: true,
      },
    ]);
  };

  const updateTrack = (index: number, field: keyof LocalTrack, value: string | number | boolean) => {
    setTracks((prev) =>
      prev.map((track, i) =>
        i === index ? { ...track, [field]: value } : track
      )
    );
  };

  const removeTrack = (index: number) => {
    setTracks((prev) => {
      const track = prev[index];
      if (track.isNew) {
        return prev.filter((_, i) => i !== index);
      }
      return prev.map((t, i) =>
        i === index ? { ...t, isDeleted: true } : t
      );
    });
  };

  const moveTrack = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= tracks.length) return;

    setTracks((prev) => {
      const newTracks = [...prev];
      [newTracks[index], newTracks[newIndex]] = [newTracks[newIndex], newTracks[index]];
      return newTracks.map((t, i) => ({ ...t, sort_order: i + 1, track_num: i + 1 }));
    });
  };

  const saveTracks = async () => {
    setIsSaving(true);

    try {
      const visibleTracks = tracks.filter((t) => !t.isDeleted);

      // Validate
      if (visibleTracks.some((t) => !t.name.trim())) {
        toast.error('트랙 이름을 입력해주세요.');
        setIsSaving(false);
        return;
      }

      // Delete removed tracks
      const deletedTracks = tracks.filter((t) => t.isDeleted && t.id);
      for (const track of deletedTracks) {
        await fetch(`/api/admin/timeline/${timelineId}/tracks/${track.id}`, {
          method: 'DELETE',
        });
      }

      // Update existing tracks
      const existingTracks = visibleTracks.filter((t) => t.id && !t.isNew);
      for (const track of existingTracks) {
        await fetch(`/api/admin/timeline/${timelineId}/tracks/${track.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: track.name,
            track_num: track.track_num,
            is_title: track.is_title,
            sort_order: track.sort_order,
          }),
        });
      }

      // Create new tracks
      const newTracks = visibleTracks.filter((t) => t.isNew);
      for (const track of newTracks) {
        await fetch(`/api/admin/timeline/${timelineId}/tracks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: track.name,
            track_num: track.track_num,
            is_title: track.is_title,
            sort_order: track.sort_order,
          }),
        });
      }

      toast.success('트랙이 저장되었습니다.');

      // Refresh page to get updated data
      window.location.reload();
    } catch {
      toast.error('저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const visibleTracks = tracks.filter((t) => !t.isDeleted);
  const hasChanges = tracks.some((t) => t.isNew || t.isDeleted) ||
    JSON.stringify(initialTracks.map(t => ({ name: t.name, is_title: t.is_title, sort_order: t.sort_order }))) !==
    JSON.stringify(visibleTracks.map(t => ({ name: t.name, is_title: t.is_title, sort_order: t.sort_order })));

  return (
    <div className={styles.trackEditor}>
      <div className={styles.trackEditorHeader}>
        <h3>트랙 관리</h3>
        <button type="button" onClick={addTrack} className={styles.addTrackButton}>
          + 트랙 추가
        </button>
      </div>

      {visibleTracks.length === 0 ? (
        <p className={styles.noTracks}>등록된 트랙이 없습니다.</p>
      ) : (
        <ul className={styles.trackList}>
          {visibleTracks.map((track, index) => {
            const originalIndex = tracks.findIndex((t) => t === track);
            return (
              <li key={track.id || `new-${index}`} className={styles.trackItem}>
                <div className={styles.trackOrder}>
                  <button
                    type="button"
                    onClick={() => moveTrack(originalIndex, 'up')}
                    disabled={index === 0}
                    className={styles.orderButton}
                  >
                    ▲
                  </button>
                  <span>{index + 1}</span>
                  <button
                    type="button"
                    onClick={() => moveTrack(originalIndex, 'down')}
                    disabled={index === visibleTracks.length - 1}
                    className={styles.orderButton}
                  >
                    ▼
                  </button>
                </div>
                <input
                  type="text"
                  value={track.name}
                  onChange={(e) => updateTrack(originalIndex, 'name', e.target.value)}
                  placeholder="트랙 이름"
                  className={styles.trackInput}
                />
                <label className={styles.trackTitleCheck}>
                  <input
                    type="checkbox"
                    checked={track.is_title}
                    onChange={(e) => updateTrack(originalIndex, 'is_title', e.target.checked)}
                  />
                  타이틀
                </label>
                <button
                  type="button"
                  onClick={() => removeTrack(originalIndex)}
                  className={styles.removeTrackButton}
                >
                  ×
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {hasChanges && (
        <button
          type="button"
          onClick={saveTracks}
          disabled={isSaving}
          className={styles.saveTracksButton}
        >
          {isSaving ? '저장 중...' : '트랙 변경사항 저장'}
        </button>
      )}
    </div>
  );
}
