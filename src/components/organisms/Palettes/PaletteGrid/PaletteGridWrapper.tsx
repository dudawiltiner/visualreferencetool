'use client';

import { useEffect, useState } from 'react';

import type { SortOption } from '@lib/types';
import { useLocalStorage } from '@lib/use-local-storage';

import { PaletteGrid } from './PaletteGrid';

export function PaletteGridWrapper() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useLocalStorage<
    'grid' | 'list' | 'columns' | 'details'
  >('paletteView', 'grid');
  const [sortOption, setSortOption] = useLocalStorage<SortOption>(
    'paletteSort',
    {
      field: 'updatedAt',
      direction: 'desc',
      label: 'Last Updated',
    }
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <PaletteGrid
      view={view}
      setView={setView}
      sortOption={sortOption}
      setSortOption={setSortOption}
    />
  );
}
