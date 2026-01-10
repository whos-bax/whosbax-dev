'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from '../admin.module.scss';

const PRESET_OPTIONS = [
  { value: 1, label: '오늘' },
  { value: 3, label: '3일' },
  { value: 7, label: '7일' },
  { value: 14, label: '14일' },
  { value: 30, label: '30일' },
  { value: 90, label: '90일' },
];

function formatDateForInput(date: Date): string {
  return date.toISOString().split('T')[0];
}

function getDateFromDaysAgo(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - days + 1);
  return date;
}

export default function DateRangePicker() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isCustom, setIsCustom] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const currentDays = searchParams.get('days');
  const currentStart = searchParams.get('start');
  const currentEnd = searchParams.get('end');

  useEffect(() => {
    if (currentStart && currentEnd) {
      setIsCustom(true);
      setStartDate(currentStart);
      setEndDate(currentEnd);
    } else {
      setIsCustom(false);
      const days = parseInt(currentDays || '3', 10);
      setStartDate(formatDateForInput(getDateFromDaysAgo(days)));
      setEndDate(formatDateForInput(new Date()));
    }
  }, [currentDays, currentStart, currentEnd]);

  const handlePresetClick = (days: number) => {
    setIsCustom(false);
    router.push(`/admin/analytics?days=${days}`);
  };

  const handleCustomApply = () => {
    if (startDate && endDate) {
      router.push(`/admin/analytics?start=${startDate}&end=${endDate}`);
    }
  };

  const currentDaysValue = parseInt(currentDays || '3', 10);
  const activePreset = !isCustom ? PRESET_OPTIONS.find((o) => o.value === currentDaysValue) : undefined;

  return (
    <div className={styles.dateRangePicker}>
      <div className={styles.presetButtons}>
        {PRESET_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => handlePresetClick(option.value)}
            className={`${styles.periodButton} ${activePreset?.value === option.value ? styles.active : ''}`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className={styles.customRange}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            setIsCustom(true);
          }}
          className={styles.dateInput}
        />
        <span className={styles.dateSeparator}>~</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
            setIsCustom(true);
          }}
          className={styles.dateInput}
        />
        <button
          onClick={handleCustomApply}
          className={`${styles.periodButton} ${isCustom ? styles.active : ''}`}
          disabled={!startDate || !endDate}
        >
          적용
        </button>
      </div>
    </div>
  );
}
