'use client';

import { useState } from 'react';

import { useToast } from '@hooks/General/use-toast';

import { DeleteConfirmDialog } from '@molecules/General/DeleteConfirmDialog/DeleteConfirmDialog';
import { PaletteDialog } from '@organisms/Palettes/PaletteDialog/PaletteDialog';
import { useData } from '@providers/DataProvider/DataProvider';
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import { Card, CardContent } from '@ui/card';
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

import { PaletteListItemProps } from './PaletteListItem.types';

export function PaletteListItem({ palette }: PaletteListItemProps) {
  const { groups, tags, palettes, setPalettes } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const group = groups.find((g) => g.id === palette.groupId);
  const paletteTags = tags.filter((tag) => palette.tagIds?.includes(tag.id));

  const handleDelete = () => {
    const updatedPalettes = palettes.filter((p) => p.id !== palette.id);
    setPalettes(updatedPalettes);
    setIsDeleteDialogOpen(false);
    toast({
      title: 'Palette deleted',
      description: 'The color palette has been removed from your collection',
    });
  };

  // Format the date
  const lastUpdated = formatDistanceToNow(new Date(palette.updatedAt), {
    addSuffix: true,
  });

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-3 flex items-center gap-4">
          <div className="flex-shrink-0 h-12 w-32 flex rounded-md overflow-hidden">
            {palette.colors.map((color, index) => (
              <div
                key={`${color}-${index}`}
                data-testid={`color-${color}`}
                className="flex-1"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold mb-1">{palette.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {group && <Badge variant="outline">{group.name}</Badge>}
              {paletteTags.map((tag) => (
                <Badge key={tag.id} variant="outline">
                  <TagIcon className="w-3 h-3 mr-1" />
                  {tag.name}
                </Badge>
              ))}
              {palette.comment && (
                <MessageSquare data-testid="comment-icon" className="w-4 h-4" />
              )}
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{lastUpdated}</span>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                data-testid="menu-button"
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                data-testid="edit-button"
                onClick={() => setIsDialogOpen(true)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                data-testid="delete-button"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
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
        title="Delete palette"
        description="Are you sure you want to delete this palette? This action cannot be undone."
      />
    </>
  );
}
