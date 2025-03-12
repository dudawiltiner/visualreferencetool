'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

import type { Group, Image, Tag } from '@hooks/AI/useGenerateCompanyContent';

import type { ColorPalette } from '@lib/types';

import { DataContextType } from './DataProvider.types';

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
  initialData: {
    images: Image[];
    setImages: (images: Image[]) => void;
    palettes: ColorPalette[];
    setPalettes: (palettes: ColorPalette[]) => void;
    groups: Group[];
    setGroups: (groups: Group[]) => void;
    tags: Tag[];
    setTags: (tags: Tag[]) => void;
  };
}

export function DataProvider({ children, initialData }: DataProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <DataContext.Provider
      value={{
        ...initialData,
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
