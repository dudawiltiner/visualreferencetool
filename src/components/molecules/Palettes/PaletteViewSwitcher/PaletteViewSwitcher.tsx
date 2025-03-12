'use client';

import { Button } from '@ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@ui/tooltip';
import { Columns, Grid, List, Maximize2 } from 'lucide-react';

import { PaletteViewSwitcherProps } from './PaletteViewSwitcher.types';

export function PaletteViewSwitcher({
  view,
  onViewChange,
}: PaletteViewSwitcherProps) {
  return (
    <TooltipProvider>
      <div className="flex border rounded-md overflow-hidden">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-none h-8 w-8 ${
                view === 'grid' ? 'bg-secondary' : ''
              }`}
              onClick={() => onViewChange('grid')}
              data-testid="grid-view-button"
              aria-label="grid"
            >
              <Grid className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Grid View</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-none h-8 w-8 ${
                view === 'list' ? 'bg-secondary' : ''
              }`}
              onClick={() => onViewChange('list')}
              data-testid="list-view-button"
              aria-label="list"
            >
              <List className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>List View</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-none h-8 w-8 ${
                view === 'columns' ? 'bg-secondary' : ''
              }`}
              onClick={() => onViewChange('columns')}
              data-testid="columns-view-button"
              aria-label="columns"
            >
              <Columns className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Columns View</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-none h-8 w-8 ${
                view === 'details' ? 'bg-secondary' : ''
              }`}
              onClick={() => onViewChange('details')}
              data-testid="details-view-button"
              aria-label="details"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Details View</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
