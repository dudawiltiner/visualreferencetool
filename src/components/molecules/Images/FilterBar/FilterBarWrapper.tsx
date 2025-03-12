'use client';

import { useEffect, useState } from 'react';

import { useData } from '@providers/DataProvider/DataProvider';

import { FilterBar } from './FilterBar';

interface FilterBarWrapperProps {
  type: 'images' | 'palettes';
}

export function FilterBarWrapper({ type }: FilterBarWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const { groups, tags } = useData();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <FilterBar type={type} initialGroups={groups} initialTags={tags} />;
}
