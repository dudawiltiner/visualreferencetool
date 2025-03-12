'use client';

import { Suspense } from 'react';

import dynamic from 'next/dynamic';

// Carregando os componentes que usam amcharts dinamicamente apenas no cliente
const DashboardStats = dynamic(
  () =>
    import('@organisms/Dashboard/DashboardStats/DashboardStats').then(
      (mod) => mod.DashboardStats
    ),
  { ssr: false }
);

const RecentItems = dynamic(
  () =>
    import('@organisms/Dashboard/RecentItems/RecentItems').then(
      (mod) => mod.RecentItems
    ),
  { ssr: false }
);

export function DashboardContent() {
  return (
    <>
      <Suspense fallback={<div>Loading stats...</div>}>
        <DashboardStats />
      </Suspense>
      <Suspense fallback={<div>Loading recent items...</div>}>
        <RecentItems />
      </Suspense>
    </>
  );
}
