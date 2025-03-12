'use client';

import { useEffect, useState } from 'react';

import type { ColorPalette, SortOption } from '@lib/types';
import { useLocalStorage } from '@lib/use-local-storage';
import { SortOptions } from '@molecules/General/SortOptions/SortOptions';
import { PaletteViewSwitcher } from '@molecules/Palettes/PaletteViewSwitcher/PaletteViewSwitcher';
import { SelectablePaletteCard } from '@molecules/Palettes/SelectablePaletteCard/SelectablePaletteCard';
import { SelectablePaletteListItem } from '@molecules/Palettes/SelectablePaletteListItem/SelectablePaletteListItem';
import { MultiSelectActions } from '@molecules/Selection/MultiSelectActions/MultiSelectActions';
import { PaletteColumnsView } from '@organisms/Palettes/PaletteColumnsView/PaletteColumnsView';
import { PaletteDetailsView } from '@organisms/Palettes/PaletteDetailsView/PaletteDetailsView';
import { useData } from '@providers/DataProvider/DataProvider';
import { useSearchParams } from 'next/navigation';

export function PaletteGrid() {
  const { palettes, setPalettes } = useData();
  const [filteredPalettes, setFilteredPalettes] = useState<ColorPalette[]>([]);
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
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const searchParams = useSearchParams();

  const groupId = searchParams.get('group');
  const tagId = searchParams.get('tag');
  const searchQuery = searchParams.get('q')?.toLowerCase();

  const sortOptions: SortOption[] = [
    { field: 'name', direction: 'asc', label: 'Name (A-Z)' },
    { field: 'name', direction: 'desc', label: 'Name (Z-A)' },
    { field: 'createdAt', direction: 'desc', label: 'Newest First' },
    { field: 'createdAt', direction: 'asc', label: 'Oldest First' },
    { field: 'updatedAt', direction: 'desc', label: 'Last Updated' },
  ];

  useEffect(() => {
    let result = [...palettes];

    // Apply filters
    if (groupId) {
      result = result.filter((palette) => palette?.groupId === groupId);
    }

    if (tagId) {
      result = result.filter((palette) => palette?.tagIds?.includes(tagId));
    }

    if (searchQuery) {
      result = result.filter(
        (palette) =>
          palette.name.toLowerCase().includes(searchQuery) ||
          palette.comment?.toLowerCase().includes(searchQuery)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      const fieldA = a[sortOption.field as keyof ColorPalette];
      const fieldB = b[sortOption.field as keyof ColorPalette];

      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortOption.direction === 'asc'
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }

      return sortOption.direction === 'asc'
        ? String(fieldA).localeCompare(String(fieldB))
        : String(fieldB).localeCompare(String(fieldA));
    });

    setFilteredPalettes(result);
    setSelectedItems([]);
  }, [palettes, groupId, tagId, searchQuery, sortOption]);

  useEffect(() => {
    if (selectedItems.length > 0 && !selectionMode) {
      setSelectionMode(true);
    } else if (selectedItems.length === 0 && selectionMode) {
      setSelectionMode(false);
    }
  }, [selectedItems, selectionMode]);

  const handleSelectItem = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedItems(filteredPalettes.map((palette) => palette.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleDeleteSelected = (ids: string[]) => {
    const updatedPalettes = palettes.filter(
      (palette) => !ids.includes(palette.id)
    );
    setPalettes(updatedPalettes);
    setSelectedItems([]);
  };

  if (filteredPalettes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No palettes found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        {['grid', 'list'].includes(view) ? (
          <MultiSelectActions
            items={filteredPalettes}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onSelectAll={handleSelectAll}
            onDeleteSelected={handleDeleteSelected}
            type="palettes"
          />
        ) : (
          <div className="flex items-center gap-2" />
        )}

        <div className="flex items-center gap-2">
          <SortOptions
            options={sortOptions}
            currentSort={sortOption}
            onSortChange={setSortOption}
          />
          <PaletteViewSwitcher view={view} onViewChange={setView} />
        </div>
      </div>

      {view === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-h-[calc(100vh-220px)] overflow-y-auto p-1">
          {filteredPalettes.map((palette) => (
            <SelectablePaletteCard
              key={palette.id}
              palette={palette}
              isSelected={selectedItems.includes(palette.id)}
              selectionMode={selectionMode}
              onSelect={handleSelectItem}
            />
          ))}
        </div>
      )}

      {view === 'list' && (
        <div className="space-y-2 max-h-[calc(100vh-220px)] overflow-y-auto p-1">
          {filteredPalettes.map((palette) => (
            <SelectablePaletteListItem
              key={palette.id}
              palette={palette}
              isSelected={selectedItems.includes(palette.id)}
              selectionMode={selectionMode}
              onSelect={handleSelectItem}
            />
          ))}
        </div>
      )}

      {view === 'columns' && (
        <div className="max-h-[calc(100vh-220px)] overflow-y-auto p-1">
          <PaletteColumnsView palettes={filteredPalettes} />
        </div>
      )}

      {view === 'details' && (
        <div className="max-h-[calc(100vh-220px)] overflow-y-auto p-1">
          <PaletteDetailsView palettes={filteredPalettes} />
        </div>
      )}
    </div>
  );
}
