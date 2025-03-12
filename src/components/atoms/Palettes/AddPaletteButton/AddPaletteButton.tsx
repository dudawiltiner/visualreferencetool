'use client';

import { useState } from 'react';

import { PaletteDialog } from '@organisms/Palettes/PaletteDialog/PaletteDialog';
import { Button } from '@ui/button';
import { Plus } from 'lucide-react';

import { AddPaletteButtonProps } from './AddPaletteButton.types';

export function AddPaletteButton({ onClick }: AddPaletteButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = () => {
    onClick?.();
    setIsDialogOpen(true);
  };

  return (
    <>
      <Button
        variant="default"
        className="w-full flex gap-2"
        onClick={handleClick}
        data-testid="add-palette-button"
      >
        <Plus className="h-6 w-6" />
        <span>Add Palette</span>
      </Button>

      <PaletteDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
