'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import type { Group, Tag } from '@lib/types';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import { Search, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterBarProps {
  type: 'images' | 'palettes';
  initialGroups: Group[];
  initialTags: Tag[];
}

export function FilterBar({
  type,
  initialGroups,
  initialTags,
}: FilterBarProps) {
  const [searchValue, setSearchValue] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentGroup = searchParams.get('group') || 'all';
  const currentTag = searchParams.get('tag') || 'all';
  const currentSearch = searchParams.get('q') || '';

  useEffect(() => {
    setSearchValue(currentSearch);
  }, [currentSearch]);

  const updateFilters = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== 'all') {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    router.push(`/${type}?${newParams.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ q: searchValue });
  };

  const handleClearFilters = () => {
    router.push(`/${type}`);
    setSearchValue('');
  };

  const hasActiveFilters = currentGroup || currentTag || currentSearch;

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder={`Search ${type}...`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={currentGroup}
          onValueChange={(value) => updateFilters({ group: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Groups" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Groups</SelectItem>
            {initialGroups?.map((group) => (
              <SelectItem key={group.id} value={group.id}>
                {group.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={currentTag}
          onValueChange={(value) => updateFilters({ tag: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Tags" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tags</SelectItem>
            {initialTags?.map((tag) => (
              <SelectItem key={tag.id} value={tag.id}>
                {tag.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleClearFilters}
            type="button"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>
    </div>
  );
}
