'use client';

import { useEffect, useState } from 'react';

import { Image } from '@hooks/AI/useGenerateCompanyContent';

import { useLocalStorage } from '@lib/use-local-storage';
import { SortOptions } from '@molecules/General/SortOptions/SortOptions';
import { SortOption } from '@molecules/General/SortOptions/SortOptions.types';
import { ImageCard } from '@molecules/Images/ImageCard/ImageCard';
import { MultiSelectActions } from '@molecules/Selection/MultiSelectActions/MultiSelectActions';
import { useData } from '@providers/DataProvider/DataProvider';
import { Checkbox } from '@ui/checkbox';
import { useSearchParams } from 'next/navigation';

export function ImageGrid() {
  const { images, setImages } = useData();
  const [filteredImages, setFilteredImages] = useState<Image[]>([]);
  const [sortOption, setSortOption] = useLocalStorage<SortOption>('imageSort', {
    field: 'updatedAt',
    direction: 'desc',
    label: 'Last Updated',
  });
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const searchParams = useSearchParams();

  const groupId = searchParams.get('group');
  const tagId = searchParams.get('tag');
  const searchQuery = searchParams.get('q')?.toLowerCase();

  const sortOptions: SortOption[] = [
    { field: 'title', direction: 'asc', label: 'Title (A-Z)' },
    { field: 'title', direction: 'desc', label: 'Title (Z-A)' },
    { field: 'createdAt', direction: 'desc', label: 'Newest First' },
    { field: 'createdAt', direction: 'asc', label: 'Oldest First' },
    { field: 'updatedAt', direction: 'desc', label: 'Last Updated' },
  ];

  useEffect(() => {
    let result = [...images];

    // Apply filters
    if (groupId) {
      result = result.filter((image) => image.groupId === groupId);
    }

    if (tagId) {
      result = result.filter((image) => image.tagIds.includes(tagId));
    }

    if (searchQuery) {
      result = result.filter(
        (image) =>
          image.title.toLowerCase().includes(searchQuery) ||
          image.comment?.toLowerCase().includes(searchQuery)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      const fieldA = a[sortOption.field as keyof Image];
      const fieldB = b[sortOption.field as keyof Image];

      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortOption.direction === 'asc'
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }

      // Default to comparing as strings
      return sortOption.direction === 'asc'
        ? String(fieldA).localeCompare(String(fieldB))
        : String(fieldB).localeCompare(String(fieldA));
    });

    setFilteredImages(result);

    // Clear selection when filters change
    setSelectedItems([]);
  }, [images, groupId, tagId, searchQuery, sortOption]);

  // Toggle selection mode when items are selected
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
      setSelectedItems(filteredImages.map((image) => image.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleDeleteSelected = (ids: string[]) => {
    const updatedImages = images.filter((image) => !ids.includes(image.id));
    setImages(updatedImages);
    setSelectedItems([]);
  };

  if (filteredImages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No images found</p>
      </div>
    );
  }

  // Create selectable version of the image card
  const SelectableImageCard = ({ image }: { image: Image }) => {
    const isSelected = selectedItems.includes(image.id);

    return (
      <div className="relative group h-full">
        <div className="absolute top-2 left-2 z-10">
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) => handleSelectItem(image.id, !!checked)}
            className={`h-5 w-5 ${
              selectionMode
                ? 'opacity-100'
                : 'opacity-0 group-hover:opacity-100'
            }`}
          />
        </div>
        <div
          className={`h-full transition-opacity ${
            isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
          }`}
          onClick={() =>
            selectionMode && handleSelectItem(image.id, !isSelected)
          }
        >
          <ImageCard image={image} />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <MultiSelectActions
          items={filteredImages}
          selectedItems={selectedItems}
          onSelectItem={handleSelectItem}
          onSelectAll={handleSelectAll}
          onDeleteSelected={handleDeleteSelected}
          type="images"
        />

        <SortOptions
          options={sortOptions}
          currentSort={sortOption}
          onSortChange={setSortOption}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-h-[calc(100vh-220px)] overflow-y-auto p-1">
        {filteredImages.map((image) => (
          <SelectableImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}
