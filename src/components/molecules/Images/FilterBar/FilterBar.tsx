'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import type { Group, Tag } from '@lib/types';
import { useLocalStorage } from '@lib/use-local-storage';
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
}

export function FilterBar({ type }: FilterBarProps) {
  const [groups] = useLocalStorage<Group[]>('groups', []);
  const [tags] = useLocalStorage<Tag[]>('tags', []);
  const [searchValue, setSearchValue] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentGroup = searchParams.get('group') || '';
  const currentTag = searchParams.get('tag') || '';
  const currentSearch = searchParams.get('q') || '';

  useEffect(() => {
    setSearchValue(currentSearch);
  }, [currentSearch]);

  const updateFilters = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
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
    <div className="flex flex-col sm:flex-row gap-4">
      <form onSubmit={handleSearch} className="flex-1 flex gap-2">
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </form>

      <div className="flex gap-2">
        <Select
          value={currentGroup}
          onValueChange={(value) => updateFilters({ group: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All groups</SelectItem>
            {groups.map((group) => (
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
            <SelectValue placeholder="Select tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All tags</SelectItem>
            {tags.map((tag) => (
              <SelectItem key={tag.id} value={tag.id}>
                {tag.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="ghost" size="icon" onClick={handleClearFilters}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
