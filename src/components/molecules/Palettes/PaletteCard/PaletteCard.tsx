'use client';

import { useState } from 'react';

import { useToast } from '@hooks/General/use-toast';

import type { ColorPalette } from '@lib/types';
import { DeleteConfirmDialog } from '@molecules/General/DeleteConfirmDialog/DeleteConfirmDialog';
import { PaletteDialog } from '@organisms/Palettes/PaletteDialog/PaletteDialog';
import { useData } from '@providers/DataProvider/DataProvider';
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import { Card, CardContent, CardFooter } from '@ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';
import {
  Clock,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  TagIcon,
  Trash2,
} from 'lucide-react';

interface PaletteCardProps {
  palette: ColorPalette;
}

export function PaletteCard({ palette }: PaletteCardProps) {
  const { groups, tags, palettes, setPalettes } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const group = groups?.find((g) => g.id === palette?.groupId);
  const paletteTags = tags?.filter((tag) => palette?.tagIds?.includes(tag.id));

  const handleDelete = () => {
    const updatedPalettes = palettes?.filter((p) => p.id !== palette.id);
    setPalettes(updatedPalettes);
    setIsDeleteDialogOpen(false);
    toast({
      title: 'Palette deleted',
      description: 'The color palette has been removed from your collection',
    });
  };

  const lastUpdated = formatDistanceToNow(new Date(palette.updatedAt), {
    addSuffix: true,
  });

  return (
    <>
      <Card className="overflow-hidden h-full flex flex-col">
        <CardContent className="p-0 relative">
          <div className="h-24 flex">
            {palette.colors.map((color, index) => (
              <div
                key={index}
                className="flex-1 h-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4 flex-1">
          <div className="w-full flex justify-between items-start mb-2">
            <h3 className="font-medium truncate">{palette.name}</h3>
            {palette.comment && (
              <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
            )}
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            {palette.colors.map((color, index) => (
              <div key={index} className="flex items-center gap-1">
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs text-muted-foreground">{color}</span>
              </div>
            ))}
          </div>
          {group && (
            <Badge variant="outline" className="mb-2">
              {group.name}
            </Badge>
          )}
          {paletteTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {paletteTags.map((tag) => (
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
          )}
          <div className="flex items-center text-xs text-muted-foreground w-full">
            <Clock className="h-3 w-3 mr-1" />
            <span>Updated {lastUpdated}</span>
          </div>
        </CardFooter>
      </Card>

      <PaletteDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        palette={palette}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Palette"
        description="Are you sure you want to delete this color palette? This action cannot be undone."
      />
    </>
  );
}
