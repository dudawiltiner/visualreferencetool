'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

import type { Group, Image, Tag } from '@hooks/AI/useGenerateCompanyContent';

import type { ColorPalette } from '@lib/types';
import { useLocalStorage } from '@lib/use-local-storage';

import { DataContextType } from './DataProvider.types';

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useLocalStorage<Image[]>('images', []);
  const [palettes, setPalettes] = useLocalStorage<ColorPalette[]>(
    'palettes',
    []
  );
  const [groups, setGroups] = useLocalStorage<Group[]>('groups', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('tags', []);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <DataContext.Provider
      value={{
        images,
        setImages,
        palettes,
        setPalettes,
        groups,
        setGroups,
        tags,
        setTags,
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
