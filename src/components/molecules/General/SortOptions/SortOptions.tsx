'use client';

import { Button } from '@ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import {
  ListOrderedIcon as AlphabeticalSort,
  ArrowUpDown,
  Calendar,
  SortAsc,
  SortDesc,
} from 'lucide-react';

import { SortOption, SortOptionsProps } from './SortOptions.types';

export function SortOptions({
  options,
  currentSort,
  onSortChange,
}: SortOptionsProps) {
  const getIcon = (option: SortOption) => {
    if (option.field === 'name' || option.field === 'title') {
      return option.direction === 'asc' ? (
        <AlphabeticalSort className="h-4 w-4 mr-2" />
      ) : (
        <AlphabeticalSort className="h-4 w-4 mr-2 rotate-180" />
      );
    } else if (option.field === 'updatedAt' || option.field === 'createdAt') {
      return <Calendar className="h-4 w-4 mr-2" />;
    } else {
      return option.direction === 'asc' ? (
        <SortAsc className="h-4 w-4 mr-2" />
      ) : (
        <SortDesc className="h-4 w-4 mr-2" />
      );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <ArrowUpDown className="h-3.5 w-3.5" />
          <span>Ordenar por: {currentSort.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((option) => (
          <DropdownMenuItem
            key={`${option.field}-${option.direction}`}
            onClick={() => onSortChange(option)}
            className="flex items-center"
          >
            {getIcon(option)}
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
