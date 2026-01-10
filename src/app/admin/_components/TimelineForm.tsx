'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import type { TimelineWithTracks, Timeline } from '@/features/timeline';
import styles from '../admin.module.scss';

interface Props {
  initialData?: TimelineWithTracks;
  mode: 'create' | 'edit';
}

type TimelineType = Timeline['type'];

const TYPE_OPTIONS: { value: TimelineType; label: string }[] = [
  { value: 'music', label: 'Music (앨범/싱글)' },
  { value: 'featuring', label: 'Featuring (피처링)' },
  { value: 'career', label: 'Career (경력)' },
  { value: 'gap', label: 'Gap Year (휴식기)' },
  { value: 'activity', label: 'Activity (활동)' },
];

export default function TimelineForm({ initialData, mode }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    date: initialData?.date || '',
    type: initialData?.type || 'music' as TimelineType,
    tag: initialData?.tag || '',
    title: initialData?.title || '',
    cover: initialData?.cover || '',
    artist: initialData?.artist || '',
    album: initialData?.album || '',
    role: initialData?.role || '',
    description: initialData?.description || '',
    link: initialData?.link || '',
    is_title: initialData?.is_title || false,
    sort_order: initialData?.sort_order || 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as TimelineType;
    const tagMap: Record<TimelineType, string> = {
      music: 'EP',
      featuring: 'Feat.',
      career: 'Career',
      gap: 'Gap Year',
      activity: 'Activity',
    };
    setFormData((prev) => ({
      ...prev,
      type,
      tag: tagMap[type],
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('bucket', 'albums');

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || '업로드 실패');
      }

      const data = await res.json();
      setFormData((prev) => ({ ...prev, cover: data.url }));
      toast.success('이미지가 업로드되었습니다.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveCover = () => {
    setFormData((prev) => ({ ...prev, cover: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = mode === 'create'
        ? '/api/admin/timeline'
        : `/api/admin/timeline/${initialData?.id}`;

      const method = mode === 'create' ? 'POST' : 'PATCH';

      // Clean up empty strings to null
      const payload = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          value === '' ? null : value,
        ])
      );

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('저장 실패');

      toast.success(mode === 'create' ? '생성되었습니다.' : '수정되었습니다.');
      router.push('/admin/timeline');
      router.refresh();
    } catch {
      toast.error('저장에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showMusicFields = formData.type === 'music';
  const showFeaturingFields = formData.type === 'featuring';
  const showCareerFields = ['career', 'gap'].includes(formData.type);

  return (
    <form onSubmit={handleSubmit} className={styles.timelineForm}>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="date">날짜 *</label>
          <input
            type="text"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="2025.01.01 또는 2024.04 ~ 06"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="type">타입 *</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleTypeChange}
            required
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="tag">태그 *</label>
          <input
            type="text"
            id="tag"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            placeholder="EP, Single, Feat., Career 등"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="title">제목 *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {(showMusicFields || showFeaturingFields) && (
        <>
          <div className={styles.formGroup}>
            <label>커버 이미지</label>
            <div className={styles.coverUpload}>
              {formData.cover ? (
                <div className={styles.coverPreview}>
                  <Image
                    src={formData.cover}
                    alt="Cover preview"
                    width={120}
                    height={120}
                    className={styles.coverImage}
                  />
                  <button
                    type="button"
                    onClick={handleRemoveCover}
                    className={styles.removeCoverButton}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className={styles.coverPlaceholder}>
                  <span>이미지 없음</span>
                </div>
              )}
              <div className={styles.coverActions}>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className={styles.fileInput}
                  disabled={isUploading}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className={styles.uploadButton}
                >
                  {isUploading ? '업로드 중...' : '이미지 업로드'}
                </button>
                <span className={styles.uploadHint}>또는 URL 직접 입력</span>
                <input
                  type="url"
                  id="cover"
                  name="cover"
                  value={formData.cover}
                  onChange={handleChange}
                  placeholder="https://..."
                  className={styles.coverUrlInput}
                />
              </div>
            </div>
          </div>

          {showFeaturingFields && (
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="artist">아티스트</label>
                <input
                  type="text"
                  id="artist"
                  name="artist"
                  value={formData.artist}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="album">앨범명</label>
                <input
                  type="text"
                  id="album"
                  name="album"
                  value={formData.album}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
        </>
      )}

      {showCareerFields && (
        <div className={styles.formGroup}>
          <label htmlFor="role">역할</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Software Developer"
          />
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="description">설명</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="link">링크</label>
        <input
          type="url"
          id="link"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="sort_order">정렬 순서</label>
          <input
            type="number"
            id="sort_order"
            name="sort_order"
            value={formData.sort_order}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroupCheckbox}>
          <label>
            <input
              type="checkbox"
              name="is_title"
              checked={formData.is_title}
              onChange={handleChange}
            />
            타이틀곡 표시
          </label>
        </div>
      </div>

      <div className={styles.formActions}>
        <button
          type="button"
          onClick={() => router.back()}
          className={styles.cancelButton}
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? '저장 중...' : mode === 'create' ? '생성' : '수정'}
        </button>
      </div>
    </form>
  );
}
