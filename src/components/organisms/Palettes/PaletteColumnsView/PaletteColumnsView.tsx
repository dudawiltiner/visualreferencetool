'use client';

import { useState } from 'react';

import { useToast } from '@hooks/General/use-toast';

import type { ColorPalette } from '@lib/types';
import { DeleteConfirmDialog } from '@molecules/General/DeleteConfirmDialog/DeleteConfirmDialog';
import { PaletteDialog } from '@organisms/Palettes/PaletteDialog/PaletteDialog';
import { useData } from '@providers/DataProvider/DataProvider';
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { MoreHorizontal, Pencil, TagIcon, Trash2 } from 'lucide-react';

import { PaletteColumnsViewProps } from './PaletteColumnsView.types';

export function PaletteColumnsView({ palettes }: PaletteColumnsViewProps) {
  const { palettes: storedPalettes, setPalettes, groups, tags } = useData();
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleEdit = (palette: ColorPalette) => {
    setSelectedPalette(palette);
    setIsDialogOpen(true);
  };

  const handleDelete = () => {
    if (selectedPalette) {
      const updatedPalettes = storedPalettes.filter(
        (p) => p.id !== selectedPalette.id
      );
      setPalettes(updatedPalettes);
      setIsDeleteDialogOpen(false);
      toast({
        title: 'Palette deleted',
        description: 'The color palette has been removed from your collection',
      });
    }
  };

  const handleDeleteClick = (palette: ColorPalette) => {
    setSelectedPalette(palette);
    setIsDeleteDialogOpen(true);
  };

  // Group palettes by creation date (month/year)
  const groupedPalettes = palettes.reduce(
    (groups, palette) => {
      const date = new Date(palette.createdAt);
      const monthYear = `${date.toLocaleString('default', {
        month: 'long',
      })} ${date.getFullYear()}`;

      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }

      groups[monthYear].push(palette);
      return groups;
    },
    {} as Record<string, ColorPalette[]>
  );

  return (
    <>
      <div className="space-y-8">
        {Object.entries(groupedPalettes).map(([monthYear, palettes]) => (
          <div key={monthYear}>
            <h3 className="text-lg font-medium mb-4">{monthYear}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {palettes.map((palette) => {
                const group = groups.find((g) => g.id === palette.groupId);
                const paletteTags = tags.filter((tag) =>
                  palette?.tagIds?.includes(tag.id)
                );

                return (
                  <Card key={palette.id} className="overflow-hidden">
                    <CardHeader className="p-4 pb-0">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">
                          {palette.name}
                        </CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEdit(palette)}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(palette)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="h-12 flex rounded-md overflow-hidden mb-3">
                        {palette.colors.map((color, index) => (
                          <div
                            key={index}
                            className="flex-1 h-full"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {palette.colors.map((color, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <div
                              className="w-4 h-4 rounded-full border"
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-xs text-muted-foreground">
                              {color}
                            </span>
                          </div>
                        ))}
                      </div>

                      {palette.comment && (
                        <p className="text-sm text-muted-foreground mb-3">
                          {palette.comment}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-1">
                        {group && (
                          <Badge variant="outline" className="mr-1">
                            {group.name}
                          </Badge>
                        )}

                        {paletteTags?.map((tag) => (
                          <Badge
                            key={tag.id}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            <TagIcon className="h-3 w-3" />
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {selectedPalette && (
        <>
          <PaletteDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            palette={selectedPalette}
          />

          <DeleteConfirmDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            onConfirm={handleDelete}
            title="Delete Palette"
            description="Are you sure you want to delete this color palette? This action cannot be undone."
          />
        </>
      )}
    </>
  );
}
