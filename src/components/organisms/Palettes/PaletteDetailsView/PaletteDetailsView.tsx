'use client';

import { useState } from 'react';

import { ColorPalette } from '@lib/types';
import { PaletteContent } from '@molecules/Palettes/PaletteContent/PaletteContent';
import { PaletteHeader } from '@molecules/Palettes/PaletteHeader/PaletteHeader';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@ui/alert-dialog';
import { Card } from '@ui/card';

import { PaletteDialog } from '../PaletteDialog/PaletteDialog';
import { usePaletteDetails } from './PaletteDetails.hook';
import { PaletteDetailsViewProps } from './PaletteDetailsView.types';

export function PaletteDetailsView({ palettes }: PaletteDetailsViewProps) {
  const {
    groups,
    tags,
    editingColor,
    copiedColor,
    handleColorChange,
    handleDelete,
    copyColor,
    hexToRgb,
    hexToHsl,
  } = usePaletteDetails();

  const [selectedPalette, setSelectedPalette] = useState<ColorPalette | null>(
    null
  );
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      {palettes.map((palette) => {
        const group = groups?.find((g) => g.id === palette.groupId);

        return (
          <Card key={palette.id}>
            <PaletteHeader
              palette={palette}
              group={group}
              tags={tags}
              onEdit={() => {
                setSelectedPalette(palette);
                setIsEditDialogOpen(true);
              }}
              onDelete={() => {
                setSelectedPalette(palette);
                setIsDeleteDialogOpen(true);
              }}
            />

            <PaletteContent
              palette={palette}
              editingColor={editingColor}
              handleColorChange={handleColorChange}
              copiedColor={copiedColor}
              copyColor={copyColor}
              hexToRgb={hexToRgb}
              hexToHsl={hexToHsl}
            />
          </Card>
        );
      })}

      <PaletteDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        palette={selectedPalette || undefined}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              palette and all its colors.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (selectedPalette) {
                  handleDelete(selectedPalette.id);
                }
                setIsDeleteDialogOpen(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
