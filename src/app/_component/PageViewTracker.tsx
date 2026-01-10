'use client';

import { usePageView } from '@/hooks/usePageView';

export default function PageViewTracker() {
  usePageView();
  return null;
}
