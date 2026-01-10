'use client';

import { usePageView } from '@/features/analytics';

export default function PageViewTracker() {
  usePageView();
  return null;
}
