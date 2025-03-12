'use client';

import { ReactNode, useEffect, useState } from 'react';

import type { Group, Image, Tag } from '@hooks/AI/useGenerateCompanyContent';

import type { ColorPalette } from '@lib/types';
import { useLocalStorage } from '@lib/use-local-storage';

import { DataProvider } from './DataProvider';

export function DataProviderWrapper({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [images, setImages] = useLocalStorage<Image[]>('images', []);
  const [palettes, setPalettes] = useLocalStorage<ColorPalette[]>(
    'palettes',
    []
  );
  const [groups, setGroups] = useLocalStorage<Group[]>('groups', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('tags', []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DataProvider
      initialData={{
        images,
        setImages,
        palettes,
        setPalettes,
        groups,
        setGroups,
        tags,
        setTags,
      }}
    >
      {children}
    </DataProvider>
  );
}
